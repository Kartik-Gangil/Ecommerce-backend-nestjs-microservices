import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";
import { authDTO, InfoDTO } from "./DTO";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from "@nestjs/microservices";
import { timeout } from "rxjs";

//   business logic handle krte hai
@Injectable()
export class AuthService {
  constructor(@Inject('CartService') private readonly client: ClientProxy, private prisma: PrismaService, private jwt: JwtService) { }

  async signin(dto: authDTO) {
    // find the user form email
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
    //  not exist throw exception
    if (!user) throw new ForbiddenException("Credential Incorrect");
    // password match is not match throw exception
    const PassMatch = await argon.verify(user.password, dto.password)
    if (!PassMatch) throw new ForbiddenException("Credential Incorrect");

    // else send to the user
    const token = this.jwt.sign(user.id)

    return { token };

  }
  async signup(dto: authDTO) {
    try {

      // generate the hash of the password
      const hash = await argon.hash(dto.password)
      // insert the new user in the DB

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash
        }
      });
      //  return the message saved user
      const token = this.jwt.sign(user.id)
      try {
        await this.client.send('create-cart', user.id).pipe(timeout(5000)).toPromise();
      } catch (err) {
        // log this error to a monitoring service
        console.error('Cart creation failed:', err.message || err);
      }
      return { token };
    }
    catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == 'P2002') {
          throw new ForbiddenException('Credentials taken already')
        }
      }
      throw e;
    }
  }

  async UpdateUser(dto: InfoDTO, authHeader: string) {
    try {
      const token = authHeader?.split(' ')[1]
      if (!token) throw new ForbiddenException('No token provided');
      const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });

      const updatedUser = await this.prisma.user.update({
        where: {
          id: decoded
        },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          mobileNo: dto.mobileNo,
          address: dto.address
        }
      })
      return updatedUser;

    } catch (e) {
      return e
    }
  }

  async getUser(authHeader: string) {
    try {
      const token = authHeader?.split(' ')[1]
      if (!token) throw new ForbiddenException('No token provided');
      const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });

      const user = await this.prisma.user.findUnique({ where: { id: decoded } })
      if (!user) return new ForbiddenException('user not found')
      return user;

    } catch (e) {
      return e
    }
  }


}
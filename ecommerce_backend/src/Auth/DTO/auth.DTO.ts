import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class authDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}


export class InfoDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string
    @IsString()
    @IsNotEmpty()
    lastName: string
    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    mobileNo: string
}
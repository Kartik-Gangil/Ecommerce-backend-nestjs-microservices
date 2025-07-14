import { Body, Controller, Get, Headers, Post, Put } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { authDTO, InfoDTO } from "./DTO";

//  yha req handle krte hai
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signin')
    signin(@Body() dto: authDTO) {
        return this.authService.signin(dto)
    }
    @Post('signup')
    signup(@Body() dto: authDTO) {
        return this.authService.signup(dto)
    }
    @Put('updateUser')
    UpdateUser(@Body() dto: InfoDTO, @Headers('authorization') authHeader: string) {
        return this.authService.UpdateUser(dto, authHeader)
    }
    @Get('/')
    getUser(@Headers('authorization') authHeader: string) {
        return this.authService.getUser(authHeader)
    }
}
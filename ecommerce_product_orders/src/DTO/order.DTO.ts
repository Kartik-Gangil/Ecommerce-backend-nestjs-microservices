import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator"
import {Type} from 'class-transformer'
export class orderDTO {

    @IsNotEmpty()
    @IsString()
    userid: string

    @IsNumber()
    @IsNotEmpty()
    amount: number
    
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => orderItemDTO)
    item : orderItemDTO[]

}

export class orderItemDTO {
    @IsNotEmpty()
    @IsString()
    productId: string

    @IsNumber()
    @IsNotEmpty()
    quantity: number
    
    @IsNumber()
    @IsNotEmpty()
    pricePerUnit: number
}
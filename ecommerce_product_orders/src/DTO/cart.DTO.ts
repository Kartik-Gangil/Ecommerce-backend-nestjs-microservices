import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class cartDTOItem {
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
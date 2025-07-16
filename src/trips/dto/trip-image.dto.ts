import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateTripImageDto {
    @IsNotEmpty({ message: 'Trip Image URL cannot be empty' })
    url: string;
}
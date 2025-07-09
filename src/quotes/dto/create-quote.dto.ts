import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateQuoteDto {
    @IsString({ message: 'Quotes must be a string' })
    @IsNotEmpty({ message: 'Quotes cannot be empty' })
    quotes: string;

    author?: string;
}

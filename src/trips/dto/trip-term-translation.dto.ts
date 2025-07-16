import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateTripTermTranslationDto {
    @IsNotEmpty()
    language_code: string;

    @IsNotEmpty()
    description: string;
}
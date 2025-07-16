import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateTripFacilityTranslationDto {
    @IsNotEmpty()
    language_code: string;

    @IsNotEmpty()
    name: string;
}

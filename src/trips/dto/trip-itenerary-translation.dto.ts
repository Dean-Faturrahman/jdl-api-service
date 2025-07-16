import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateTripItineraryItemTranslationDto {
    @IsNotEmpty()
    language_code: string;

    @IsNotEmpty()
    activity: string;
}
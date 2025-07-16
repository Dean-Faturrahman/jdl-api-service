import { IsNotEmpty, IsString } from "@nestjs/class-validator";

export class CreateTripTranslationDto {
  @IsNotEmpty()
  language_code: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;
}
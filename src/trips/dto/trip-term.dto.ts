import { IsArray, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { CreateTripTermTranslationDto } from "./trip-term-translation.dto";

export class CreateTripTermDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripTermTranslationDto)
  translations: CreateTripTermTranslationDto[];
}
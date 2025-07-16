import { IsArray, IsOptional, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { CreateTripItineraryItemTranslationDto } from "./trip-itenerary-translation.dto";

export class CreateTripItineraryDto {
  @IsOptional()
  time?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripItineraryItemTranslationDto)
  translations: CreateTripItineraryItemTranslationDto[];
}

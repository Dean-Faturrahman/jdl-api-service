import { IsArray, IsNotEmpty, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { CreateTripFacilityTranslationDto } from "./trip-facility-translation.dto";

export class CreateTripFacilityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripFacilityTranslationDto)
  translations: CreateTripFacilityTranslationDto[];
}
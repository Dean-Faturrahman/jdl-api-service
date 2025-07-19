import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, Max, Min, ValidateNested, IsString, IsNumber, IsBoolean } from 'class-validator';
import { CreateTripTranslationDto } from './trip-translataion.dto';
import { CreateTripImageDto } from './trip-image.dto';
import { CreateTripFacilityDto } from './trip-facility.dto';
import { CreateTripItineraryDto } from './trip-itenerary.dto';
import { CreateTripTermDto } from './trip-term.dto';

export class CreateTripDto {
  @IsOptional()
  @IsString()
  latitude?: string;

  @IsOptional()
  @IsString()
  longitude?: string;
  
  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  discount?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_highlight?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripTranslationDto)
  translations: CreateTripTranslationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripImageDto)
  images?: CreateTripImageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripFacilityDto)
  facilities?: CreateTripFacilityDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripItineraryDto)
  itinerary?: CreateTripItineraryDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTripTermDto)
  terms?: CreateTripTermDto[];
}
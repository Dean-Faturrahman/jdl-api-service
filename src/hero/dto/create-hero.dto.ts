import {
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HeroTranslationDto } from './hero-translation.dto';
import { HeroImageDto } from './hero-image.dto';

export class CreateHeroDto {
  @IsArray({ message: 'validation.isArray' })
  @ArrayNotEmpty({ message: 'validation.arrayNotEmpty' })
  @ValidateNested({ each: true })
  @Type(() => HeroImageDto)
  image_url: HeroImageDto[];

  @IsArray({ message: 'validation.isArray' })
  @ArrayNotEmpty({ message: 'validation.arrayNotEmpty' })
  @ValidateNested({ each: true })
  @Type(() => HeroTranslationDto)
  translations: HeroTranslationDto[];
}
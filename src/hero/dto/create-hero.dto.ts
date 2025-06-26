import {
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HeroTranslationDto } from './hero-translation.dto';

export class CreateHeroDto {
  @IsUrl({}, { message: 'validation.isUrl' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  image_url: string;

  @IsArray({ message: 'validation.isArray' })
  @ArrayNotEmpty({ message: 'validation.arrayNotEmpty' })
  @ValidateNested({ each: true })
  @Type(() => HeroTranslationDto)
  translations: HeroTranslationDto[];
}
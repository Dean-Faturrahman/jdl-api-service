import { IsNotEmpty, IsString, Length } from 'class-validator';

export class HeroTranslationDto {
  @IsString({ message: 'validation.isString' })
  @Length(2, 5, { message: 'validation.language_code.length' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  language_code: string;

  @IsString({ message: 'validation.isString' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  title: string;

  @IsString({ message: 'validation.isString' })
  @IsNotEmpty({ message: 'validation.isNotEmpty' })
  description: string;
}
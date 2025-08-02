import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GalleryTranslationDto {
    @IsString({ message: 'validation.isString' })
    @Length(2, 5, { message: 'validation.language_code.length' })
    @IsNotEmpty({ message: 'validation.isNotEmpty' })
    language_code: string;

    @IsNotEmpty({ message: 'Description cannot be empty' })
    @IsString()
    description: string;
}
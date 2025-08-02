import { IsNotEmpty, IsString, Length } from 'class-validator';

export class StoryTranslationDto {
    @IsString({ message: 'validation.isString' })
    @Length(2, 5, { message: 'validation.language_code.length' })
    @IsNotEmpty({ message: 'validation.isNotEmpty' })
    language_code: string;

    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Content cannot be empty' })
    @IsString()
    content: string;
}
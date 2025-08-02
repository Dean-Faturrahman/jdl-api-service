import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { StoryTranslationDto } from "./story-translation.dto";

export class CreateStoryDto {
    @IsOptional()
    @IsUrl()
    image_url?: string;

    @IsArray({ message: 'validation.isArray' })
    @ArrayNotEmpty({ message: 'validation.arrayNotEmpty' })
    @ValidateNested({ each: true })
    @Type(() => StoryTranslationDto)
    translations: StoryTranslationDto[];

}

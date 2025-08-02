import { ArrayNotEmpty, IsArray, IsOptional, IsUrl, ValidateNested } from "@nestjs/class-validator";
import { Type } from "class-transformer";
import { GalleryTranslationDto } from "./gallery-translation.dto";

export class CreateGalleryDto {
    @IsOptional()
    @IsUrl()
    image_url?: string;

    @IsArray({ message: 'validation.isArray' })
    @ArrayNotEmpty({ message: 'validation.arrayNotEmpty' })
    @ValidateNested({ each: true })
    @Type(() => GalleryTranslationDto)
    translations: GalleryTranslationDto[];
}

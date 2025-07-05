import { IsNotEmpty, IsUrl } from "@nestjs/class-validator";

export class CreateHighlightDto {
    @IsNotEmpty({ message: 'Title cannot be empty' })
    title: string;

    description: string;

    @IsUrl({ message: 'Image URL must be a valid URL' })
    image_url: string; 
}

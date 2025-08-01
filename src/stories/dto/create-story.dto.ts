import { IsNotEmpty, IsOptional, IsString, IsUrl } from "@nestjs/class-validator";

export class CreateStoryDto {
    @IsNotEmpty({ message: 'Title cannot be empty' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Content cannot be empty' })
    @IsString()
    content: string;

    @IsOptional()
    @IsUrl()
    image_url?: string;

}

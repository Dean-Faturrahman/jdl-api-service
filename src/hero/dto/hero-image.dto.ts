import { IsNotEmpty } from "@nestjs/class-validator";

export class HeroImageDto {
    @IsNotEmpty({ message: 'validation.isNotEmpty' })
    url: string;
}
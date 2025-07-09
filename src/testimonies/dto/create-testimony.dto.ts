import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateTestimonyDto {
    @IsNotEmpty({ message: 'Testimony cannot be empty' })
    testimony: string;
    
    author?: string;
}

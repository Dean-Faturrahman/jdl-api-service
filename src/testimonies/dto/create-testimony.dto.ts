import { IsNotEmpty } from "@nestjs/class-validator";

export class CreateTestimonyDto {
    @IsNotEmpty({ message: 'Trip ID is required' })
    trip_id: number;

    @IsNotEmpty({ message: 'Testimony cannot be empty' })
    testimony: string;
    
    author?: string;
}

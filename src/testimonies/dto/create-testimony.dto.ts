import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class CreateTestimonyDto {
    // @IsNotEmpty({ message: 'Trip ID is required' })
    // trip_id: number;

    // @IsNotEmpty({ message: 'Testimony cannot be empty' })
    // testimony: string;
    
    // @IsOptional()
    // author?: string;

    @IsOptional()
    is_shown?: boolean;
}

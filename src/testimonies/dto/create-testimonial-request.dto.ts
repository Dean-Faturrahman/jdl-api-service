import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateTestimonialRequestDto {
  @IsInt()
  @IsNotEmpty()
  trip_id: number;
}
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubmitTestimonyDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  testimony: string;

  @IsOptional()
  @IsString()
  author?: string;
}
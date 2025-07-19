import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyTranslationDto {
  @IsString()
  @IsNotEmpty()
  language_code: string;

  @IsOptional()
  @IsString()
  philosophy?: string;

  @IsOptional()
  @IsString()
  values?: string;

  @IsOptional()
  @IsString()
  background?: string;

  @IsOptional()
  @IsString()
  vision?: string;

  @IsOptional()
  @IsString()
  mission?: string;
}
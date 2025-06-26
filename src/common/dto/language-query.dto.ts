import { IsIn, IsOptional, IsString } from 'class-validator';

const supportedLangs = ['id', 'en']; 

export class LanguageQueryDto {
  @IsOptional()
  @IsString()
  @IsIn(supportedLangs, { message: 'Language is not supported' })
  lang: string;
}
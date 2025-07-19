import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateCompanyImageDto {
    @IsNotEmpty()
    url: string;
}
import { Module } from '@nestjs/common';
import { AdminCompanyService } from './admin/company.service';
import { AdminCompanyController } from './admin/company.controller';
import { CompanyService } from './public/company.service';
import { CompanyController } from './public/company.controller';

@Module({
  controllers: [AdminCompanyController, CompanyController],
  providers: [AdminCompanyService, CompanyService],
})
export class CompanyModule {}

import { Module } from '@nestjs/common';
import { AdminQuotesService } from './admin/quotes.service';
import { AdminQuotesController } from './admin/quotes.controller';
import { QuotesController } from './public/quotes.controller';
import { QuotesService } from './public/quotes.service';

@Module({
  controllers: [AdminQuotesController, QuotesController],
  providers: [AdminQuotesService, QuotesService],
})
export class QuotesModule {}

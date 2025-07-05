import { Module } from '@nestjs/common';
import { HighlightsController } from './admin/highlights.controller';
import { HighlightsService } from './admin/highlights.service';

@Module({
  controllers: [HighlightsController],
  providers: [HighlightsService],
})
export class HighlightsModule {}

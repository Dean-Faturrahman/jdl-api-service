import { Module } from '@nestjs/common';
import { AdminHighlightsController } from './admin/highlights.controller';
import { AdminHighlightsService } from './admin/highlights.service';
import { HighlightsController } from './public/highlights.controller';
import { HighlightsService } from './public/highlights.service';

@Module({
  controllers: [AdminHighlightsController, HighlightsController],
  providers: [AdminHighlightsService, HighlightsService],
})
export class HighlightsModule {}

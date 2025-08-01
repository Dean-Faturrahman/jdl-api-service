import { Module } from '@nestjs/common';
import { StoriesService } from './admin/stories.service';
import { StoriesController } from './admin/stories.controller';

@Module({
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}

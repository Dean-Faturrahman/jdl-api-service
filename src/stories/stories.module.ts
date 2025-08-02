import { Module } from '@nestjs/common';
import { AdminStoriesService } from './admin/stories.service';
import { AdminStoriesController } from './admin/stories.controller';
import { StoriesController } from './public/stories.controller';
import { StoriesService } from './public/stories.service';

@Module({
  controllers: [AdminStoriesController, StoriesController],
  providers: [AdminStoriesService, StoriesService],
})
export class StoriesModule {}

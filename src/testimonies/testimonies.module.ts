import { Module } from '@nestjs/common';
import { AdminTestimoniesController } from './admin/testimonies.controller';
import { AdminTestimoniesService } from './admin/testimonies.service';
import { TestimoniesController } from './public/testimonies.controller';
import { TestimoniesService } from './public/testomonies.service';

@Module({
  controllers: [AdminTestimoniesController, TestimoniesController],
  providers: [AdminTestimoniesService, TestimoniesService],
})
export class TestimoniesModule {}

import { Module } from '@nestjs/common';
import { AdminGalleriesService } from './admin/galleries.service';
import { AdminGalleriesController } from './admin/galleries.controller';
import { GalleriesController } from './public/galleries.controller';
import { GalleriesService } from './public/galleries.service';

@Module({
  controllers: [AdminGalleriesController, GalleriesController],
  providers: [AdminGalleriesService, GalleriesService],
})
export class GalleriesModule {}

import { Module } from '@nestjs/common';
import { AdminTripsService } from './admin/trips.service';
import { AdminTripsController } from './admin/trips.controller';
import { TripsController } from './public/trips.controller';
import { TripsService } from './public/trips.service';

@Module({
  controllers: [AdminTripsController, TripsController],
  providers: [AdminTripsService, TripsService],
})
export class TripsModule {}

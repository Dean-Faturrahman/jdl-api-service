import { Module } from '@nestjs/common';
import { TripsService } from './admin/trips.service';
import { TripsController } from './admin/trips.controller';

@Module({
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}

import { Module } from '@nestjs/common';
import { LocationController } from './controllers';
import { LocationService } from './services';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService]
})
export class LocationModule {}

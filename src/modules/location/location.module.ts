import { Module } from '@nestjs/common';
import { LocationController } from './controllers';
import { LocationService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District, Province, Street, Ward } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([Province, District, Street, Ward])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService]
})
export class LocationModule {}

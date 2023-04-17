import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './controllers';
import { Room } from './models';
import { RoomService } from './services';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), LocationModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './controllers';
import { Room } from './models';
import { RoomService } from './services';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), MediaModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}

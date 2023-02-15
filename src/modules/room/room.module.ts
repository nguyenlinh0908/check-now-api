import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './models';
import { RoomService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  providers: [RoomService],
})
export class RoomModule {}

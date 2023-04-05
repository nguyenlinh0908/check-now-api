import { Room } from 'src/modules/room/models';
import { User } from 'src/modules/user/models';
import { BaseModel } from 'src/utils';
import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: number;

  @ManyToOne(() => Room, (room) => room.id)
  room: number;
}

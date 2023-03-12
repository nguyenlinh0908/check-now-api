import { Room } from 'src/modules/room/models';
import { User } from 'src/modules/user/models';
import { BaseModel } from 'src/utils';
import { Entity, ManyToMany } from 'typeorm';

@Entity()
export class Favorite extends BaseModel {
  @ManyToMany(() => User, (user) => user.id)
  user: string;

  @ManyToMany(() => Room, (room) => room.id)
  room: string;
}

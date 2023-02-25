import { Room } from 'src/modules/room/models';
import { User } from 'src/modules/user/models';
import { Entity, ManyToMany } from 'typeorm';

@Entity()
export class Favorite {
  @ManyToMany(() => User, (user) => user.id)
  user: string;

  @ManyToMany(() => Room, (room) => room.id)
  room: string;
}

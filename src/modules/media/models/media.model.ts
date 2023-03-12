import { Room } from 'src/modules/room/models';
import { User } from 'src/modules/user/models';
import { BaseModel } from 'src/utils';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MediaTag } from '../enum';

@Entity()
export class Media extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  type: string;

  @Column({ type: String })
  url: string;

  @Column({
    type: 'enum',
    enum: MediaTag,
  })
  tag: MediaTag;

  @ManyToOne(() => User, (user) => user.id)
  user: string;

  @ManyToOne(() => Room, (room) => room.id)
  room: string;

  @ManyToOne(() => User, (user) => user.id)
  author: string;
}

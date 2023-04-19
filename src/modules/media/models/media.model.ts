import { Room } from 'src/modules/room/models';
import { User } from 'src/modules/user/models';
import { BaseModel } from 'src/utils';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
    default: MediaTag.AVATAR,
  })
  tag: MediaTag;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user' })
  user: User | number;

  @ManyToOne(() => Room, (room) => room.id, { eager: true })
  room: Room | number;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  author: User | number;
}

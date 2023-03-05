import { Room } from 'src/modules/room/models';
import { User } from 'src/modules/user/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  type: string;

  @Column({ type: String })
  url: string;

  @ManyToOne(() => User, (user) => user.id)
  user: string;

  @ManyToOne(() => Room)
  room: string;

  @ManyToOne(() => User, (user) => user.id)
  author: string;
}

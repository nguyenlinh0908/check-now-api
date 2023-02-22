import { User } from 'src/modules/user/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomType } from '../enum';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  name: string;

  @Column({
    type: String,
  })
  description: string;

  @Column()
  province: string;

  @Column()
  district: string;

  @Column()
  ward: string;

  @Column({
    type: String,
  })
  micro_address: string;

  @Column({
    type: 'enum',
    enum: RoomType,
  })
  type: RoomType;

  @Column({ type: String, nullable: true })
  avatar?: string;

  @Column({
    type: Boolean,
    nullable: true,
  })
  star?: boolean;

  @Column({
    type: Number,
  })
  price: number;

  @Column({
    type: Number,
  })
  acreage: number;

  // @Column()
  // experience: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: string;
}

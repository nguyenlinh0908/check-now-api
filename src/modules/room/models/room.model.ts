import { dateToTimestamp, timeStampToDate } from 'src/helpers';
import { User } from 'src/modules/user/models';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomType } from '../enums';

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
  province: number;

  @Column()
  district: number;

  @Column()
  ward: number;

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

  @Column({
    transformer: {
      to(value) {
        // before insert
        return timeStampToDate(value);
      },
      from(value) {
        // after query
        return dateToTimestamp(value);
      },
    },
    default: '1970-01-01 00:00:00',
  })
  expired: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: string;
}

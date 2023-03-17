import { dateToTimestamp, timeStampToDate } from 'src/helpers';
import { User } from 'src/modules/user/models';
import { BaseModel } from 'src/utils';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomType } from '../enums';

@Entity()
export class Room extends BaseModel {
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
    default: '2022-08-09 00:00:00',
  })
  expired: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: string;
}

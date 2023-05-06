import { dateToTimestamp, timeStampToDate } from 'src/helpers';
import { User } from 'src/modules/user/models';
import { BaseModel } from 'src/utils';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomType, RoomStatus } from '../enums';
import { District, Province, Ward } from 'src/modules/location/models';

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

  @ManyToOne(() => Province, (province) => province.id, {
    eager: true,
  })
  @JoinColumn({ name: 'province' })
  province: Province | number;

  @ManyToOne(() => District, (district) => district.id, {
    eager: true,
  })
  @JoinColumn({ name: 'district' })
  district: District | number;

  @ManyToOne(() => Ward, (ward) => ward.id, {
    eager: true,
  })
  @JoinColumn({ name: 'ward' })
  ward: Ward | number;

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
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.OPEN
  })
  status: RoomStatus;

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

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user' })
  user: User | number;
}

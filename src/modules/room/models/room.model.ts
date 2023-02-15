import { dateToTimestamp } from './../../../helpers/time.helper';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  acreage: number;

  @Column({ type: String })
  city: string;

  @Column({ type: String })
  district: string;

  @Column({ type: String })
  ward: string;

  @Column({ type: String })
  detailAddress: string;

  @Column({ type: String })
  banner: string;

  @Column('string', { array: true })
  media: string[];

  @CreateDateColumn({
    type: Date,
    transformer: {
      to: (value) => {
        return value;
      },
      from: (value) => {
        return dateToTimestamp(value);
      },
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: Date,
    transformer: {
      to: (value) => {
        return value;
      },
      from: (value) => {
        return dateToTimestamp(value);
      },
    },
  })
  updatedAt: Date;
}

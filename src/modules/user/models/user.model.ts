import { dateToTimestamp, timeStampToDate } from 'src/helpers';
import { Role } from 'src/modules/auth/enums';
import { BaseModel } from 'src/utils';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '../enums';

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
    unique: true,
  })
  username: string;

  @Column({
    type: String,
    // select: false,
  })
  password: string;

  @Column({
    type: String,
  })
  fullName: string;

  @Column({
    type: String,
  })
  address: string;

  @Column({
    type: Date,
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
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @Column({
    type: String,
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}

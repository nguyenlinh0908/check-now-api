import { Role } from 'src/modules/auth/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { dateToTimestamp, timeStampToDate } from './../../helpers';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
  })
  userID: string;

  @Column({
    type: String,
  })
  token: string;

  @Column({
    type: Boolean,
    default: false,
  })
  blacklist: boolean;

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
  })
  expires: Date;
}

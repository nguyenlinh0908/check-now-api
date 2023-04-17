import { dateToTimestamp, timeStampToDate } from 'src/helpers';
import { BaseModel } from 'src/utils';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'province' })
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  _name: String;

  @Column({ type: String })
  _code: String;
}

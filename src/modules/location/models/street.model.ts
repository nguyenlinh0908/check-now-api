import { dateToTimestamp, timeStampToDate } from 'src/helpers';
import { BaseModel } from 'src/utils';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.model';
import { Province } from './province.model';

@Entity({ name: 'street' })
export class Street {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  _name: String;

  @Column({ type: String, nullable: true })
  _prefix?: String;

  @ManyToOne(() => Province, (province) => province.id)
  @JoinColumn({ name: '_province_id' })
  _province_id: Number;

  @ManyToOne(() => District, (district) => district.id)
  @JoinColumn({ name: '_district_id' })
  _district_id: Number;
}

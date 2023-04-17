import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Province } from './province.model';

@Entity({ name: 'district' })
export class District {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  _name: String;

  @Column({ type: String, nullable: true })
  _prefix?: String;

  @ManyToOne(() => Province, (province) => province.id)
  @JoinColumn({ name: '_province_id' })
  _province_id: Number;
}

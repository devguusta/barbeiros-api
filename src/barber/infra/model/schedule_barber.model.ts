import { AddressModel } from '../../../core/model/address.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'schedule_barber' })
export class ScheduleBarberModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'barber_id' })
  barber_id: string;

  @Column({ name: 'client_id' })
  client_id: string;

  @Column({ name: 'schedule_date' })
  owner_name: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;

  @OneToOne(() => AddressModel)
  @JoinColumn()
  address: AddressModel;
}

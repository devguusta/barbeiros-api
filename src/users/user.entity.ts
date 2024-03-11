import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'document', nullable: false, unique: true })
  document: string;

  @Column({ name: 'cellphone', nullable: false, unique: true })
  cellphone: string;

  @Column({ name: 'barber', default: false })
  barber: boolean;

  @Column({ name: 'password', nullable: false, unique: true })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: string;
}

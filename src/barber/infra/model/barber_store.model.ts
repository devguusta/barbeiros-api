import { AddressModel } from 'src/core/model/address.model';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
  
  @Entity({ name: 'barber_store' })
  export class BarberStoreModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ name: 'owner_id', nullable: false })
    owner_id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: true })
    email: string;
  
    @Column({ name: 'document', nullable: false, unique: true })
    document: string;
  
    @Column({ name: 'cellphone', nullable: true })
    cellphone: string;
  
    @Column({ name: 'owner_name', default: false })
    owner_name: string;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;
  
    @UpdateDateColumn({ name: 'update_at' })
    updateAt: string;

    @OneToOne(() => AddressModel)
    @JoinColumn()
    address: AddressModel
  }
  
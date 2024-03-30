import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'street' })
    street: string;

    @Column({ name: 'number', })
    number: string;

    @Column({ name: 'state', })
    state: string;

    @Column({ name: 'neighborhood', })
    neighborhood: string;

    @Column({ name: 'cep', })
    cep: string;

    @Column({ name: 'complement', nullable: true })
    complement: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'update_at' })
    updateAt: string;
}

import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'account'})
export class Account {

    @PrimaryGeneratedColumn('uuid', {name: 'account_id'})
    accountId: string;

    @Column({name: 'account_name'})
    accountName: string;

    @Column()
    password: string;

    @Column()
    balance: number;

    @Column({name: 'card_id'})
    cardId: string;
}
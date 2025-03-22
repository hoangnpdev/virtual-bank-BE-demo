import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'payment'})
export class Payment {

    @PrimaryGeneratedColumn('uuid', {name: 'payment_id'})
    paymentId: string;

    @Column({name: 'merchant_id'})
    merchantId: string;

    @Column({name:'account_id'})
    accountId: string;

    @Column()
    amount: number;

    @Column()
    status: string;
}
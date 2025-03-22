import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'merchant'})
export class Merchant {

    @PrimaryGeneratedColumn('uuid', {name: 'merchant_id'})
    merchantId: string;

    @Column({name: 'account_id'})
    accountId: string;

    @Column({name: 'access_code'})
    accessCode: string;
}
import { Module } from '@nestjs/common';
import {PaymentController} from "./payment.controller";
import {PaymentService} from "./payment.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Payment} from "./entity/payment.entity";
import {Merchant} from "./entity/merchant.entity";
import {BankModule} from "../bank/bank.module";
import {AuthGuard} from "../auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([Payment, Merchant]), BankModule],
    controllers: [PaymentController],
    providers: [PaymentService, AuthGuard]
})
export class PaymentModule {}

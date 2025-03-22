import { Module } from '@nestjs/common';
import {BankController} from "./bank.controller";
import {BankService} from "./bank.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Account} from "./account.entity";
import {AuthService} from "./auth.service";
import {AlsModule} from "../als.module";
import {AuthGuard} from "../auth.guard";

@Module({
    imports: [TypeOrmModule.forFeature([Account]), AlsModule],
    controllers: [BankController],
    providers: [BankService, AuthService, AuthGuard],
    exports: [AuthService, BankService, AuthGuard]
})
export class BankModule {

}

import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {BankService} from "./bank.service";
import {AuthGuard} from "../auth.guard";
import {LoginInfoDto} from "./dto/login-info.dto";
import {SignupInfoDto} from "./dto/signup-info.dto";
import {TransferInfoDto} from "./dto/transfer-info.dto";

@UseGuards(AuthGuard)
@Controller('bank')
export class BankController {

    constructor(private bankService: BankService) {
    }


    @Post('sign-in')
    async login(@Body() loginInfo: LoginInfoDto): Promise<any> {
        return this.bankService.signIn(loginInfo);
    }

    @Post('sign-up')
    async signUp(@Body() signupInfo: SignupInfoDto): Promise<any> {
        return this.bankService.signUp(signupInfo);
    }

    @Get('account-info')
    async getAccountInfo(): Promise<any> {
        return this.bankService.getAccountInfo();
    }

    @Post('transfer-money')
    async transfer(@Body() transferInfo: TransferInfoDto) {
        return this.bankService.transfer(transferInfo);
    }


    @Get('hello')
    @UseGuards(AuthGuard)
    hello(): String {
        return "hello world";
    }
}
import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {PaymentService} from "./payment.service";
import {PaymentInfoDto} from "./dto/payment-info.dto";
import {AuthGuard} from "../auth.guard";

@Controller('payment-gateway')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) {}

    @UseGuards(AuthGuard)
    @Post('merchant')
    async createMerchant() {
        return this.paymentService.createNewMerchant();
    }

    @Get('payment/:payment_id')
    async getPaymentInfo(@Param('payment_id') paymentId: string): Promise<any> {
        return this.paymentService.getPaymentInfo(paymentId);
    }

    @UseGuards(AuthGuard)
    @Post('payment/:payment_id/purchase')
    async makePurchase(@Param('payment_id') paymentId: string) {
        return this.paymentService.purchase(paymentId);
    }

    @Post('payment')
    async createNewPayment(@Body() paymentInfo: PaymentInfoDto) {
        return (await this.paymentService.createNewPayment(paymentInfo)).raw;
    }


}
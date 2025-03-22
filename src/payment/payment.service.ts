import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Merchant} from "./entity/merchant.entity";
import {Repository} from "typeorm";
import {v4 as uuid} from "uuid";
import {BankService} from "../bank/bank.service";
import {Account} from "../bank/account.entity";
import {Payment} from "./entity/payment.entity";
import {PaymentInfoDto} from "./dto/payment-info.dto";


@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Merchant)
        private merchantRepository: Repository<Merchant>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        private bankService: BankService
    ) {
    }

    async createNewMerchant() {
        let accountInfo: Account | null = await this.bankService.getAccountInfo();
        if (accountInfo === null) {
            throw new BadRequestException("Account Not Found");
        }
        let newMerchant = {
            accountId: accountInfo.accountId,
            merchantId: uuid(),
            accessCode: uuid(),
        }
        await this.merchantRepository.insert(newMerchant);
        return newMerchant;
    }

    async getPaymentInfo(paymentId: string) {
        return this.paymentRepository.findOneBy({
            paymentId: paymentId
        });
    }

    async purchase(paymentId: string) {
        let payment: Payment | null = await this.paymentRepository.findOneBy({
            paymentId: paymentId
        })
        if (payment === null) {
            throw new BadRequestException("Payment not found");
        }
        let destinationAccount =
            await this.bankService.getAccountInfoBy(payment.accountId);
        if (destinationAccount === null) {
            throw new BadRequestException("Payment not found");
        }
        //todo add transaction to this section
        payment.status = 'COMPLETED';
        await this.paymentRepository.save(payment);
        return this.bankService.transfer({
            accountName: destinationAccount?.accountName ?? '',
            amount: payment?.amount ?? 0
        })
    }

    async createNewPayment(paymentInfo: PaymentInfoDto) {
        let merchant: Merchant | null = await this.getMerchantDetails(paymentInfo.accessCode);
        if (merchant === null) {
            throw new BadRequestException("Merchant not found");
        }
        return this.paymentRepository.insert({
            accountId: merchant.accountId,
            merchantId: merchant.merchantId,
            paymentId: uuid(),
            amount: paymentInfo.amount,
        })

    }

    async getMerchantDetails(accessCode: string) {
        return this.merchantRepository.findOneBy({
            accessCode: accessCode
        })

    }
}
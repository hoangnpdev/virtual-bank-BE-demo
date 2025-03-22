import {Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Account} from "./account.entity";
import {DataSource, Repository} from "typeorm";
import {LoginInfoDto} from "./dto/login-info.dto";
import {v4 as uuid} from "uuid";
import {SignupInfoDto} from "./dto/signup-info.dto";
import {AuthService} from "./auth.service";
import {TransferInfoDto} from "./dto/transfer-info.dto";

@Injectable()
export class BankService {

    private log = new Logger(BankService.name);

    constructor(@InjectRepository(Account) private accountRepository: Repository<Account>,
                private datasource: DataSource,
                private authService: AuthService) {
    }

    async signIn(loginInfo: LoginInfoDto): Promise<any> {
        let isAccountExist = await this.accountRepository.exists({
            where: {
                accountName: loginInfo.accountName,
                password: loginInfo.password
            }
        });
        if (!isAccountExist) {
            throw new UnauthorizedException("Account not found.");
        }
        return this.authService.generateToken({accountName: loginInfo.accountName});
    }

    async signUp(signUpInfo: SignupInfoDto): Promise<any> {
        let accountId = uuid().toString();
        let cardId: string = uuid().toString();
        return await this.accountRepository.insert(
            {
                accountId: accountId,
                cardId: cardId,
                accountName: signUpInfo.accountName,
                password: signUpInfo.password,
                balance: 0
            }
        )
    }

    async getAccountInfo() {
        return await this.accountRepository.findOne({
            where: {accountName: this.authService.getCurrentUser()}
        })
    }

    async getAccountInfoBy(paymentId: string) {
        return this.accountRepository.findOne({
            where: {accountId: paymentId}
        })
    }

    // language=PostgreSQL
    async transfer(transferInfo: TransferInfoDto) {
        let currentUser = this.authService.getCurrentUser();

        let queryRunner = this.datasource.createQueryRunner();
        await queryRunner?.connect();
        await queryRunner?.startTransaction();

        // let r1 = await queryRunner?.query(
        //     "SELECT * FROM citus.account WHERE account.account_name=$1 or account_name=$2 FOR UPDATE",
        //     [currentUser, transferInfo.accountName]
        // );
        // this.log.log(r1);
        let r2 = await queryRunner?.query(
            "UPDATE citus.account SET balance = account.balance - $1 WHERE account.account_name=$2; ",
            [transferInfo.amount, currentUser]
        );
        this.log.log(r2);
        let r3 = await queryRunner?.query(
            "UPDATE citus.account SET balance = account.balance + $1 WHERE account.account_name=$2; ",
            [transferInfo.amount, transferInfo.accountName]
        );
        this.log.log(r3);
        await queryRunner?.commitTransaction();
        return 2;
    }


}
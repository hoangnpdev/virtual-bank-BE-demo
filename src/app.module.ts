import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {PaymentModule} from './payment/payment.module';
import {BankModule} from './bank/bank.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./jwt.constant";
import {AlsModule} from "./als.module";
import {AlsMiddleware} from "./als.middleware";

@Module({
    imports: [
        PaymentModule,
        BankModule,
        AlsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 15432,
            username: 'postgres',
            password: '',
            database: 'postgres',
            schema: 'citus',
            entities: [],
            synchronize: false,
            autoLoadEntities: true,
        }),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3600s' },
        })
    ],
    providers: [
        // {provide: APP_GUARD, useClass: AuthGuard},
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AlsMiddleware)
            .forRoutes('*');
    }
}

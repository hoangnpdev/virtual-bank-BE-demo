import {Module} from "@nestjs/common";
import {AsyncLocalStorage} from "async_hooks";
import {AlsMiddleware} from "./als.middleware";


@Module({
    providers: [{
        provide: AsyncLocalStorage,
        useValue: new AsyncLocalStorage(),
    }],
    exports: [AsyncLocalStorage],
})
export class AlsModule {}
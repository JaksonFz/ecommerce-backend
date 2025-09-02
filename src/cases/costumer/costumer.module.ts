import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Costumer } from "./costumer.entity";
import { CostumerService } from "./costumer.service";
import { CostumerController } from "./costumer.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Costumer])],
    providers: [CostumerService],
    controllers: [CostumerController]
})
export class CostumerModule { }
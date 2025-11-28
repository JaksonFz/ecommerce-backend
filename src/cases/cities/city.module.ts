import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StateController } from "./controllers/state.controller";
import { CityService } from "./services/city.service";
import { CityController } from "./controllers/city.controller";
import { StateService } from "./services/state.service";
import { City } from "./entities/city.entity";
import { State } from "./entities/state.entity";


@Module({
    imports: [TypeOrmModule.forFeature([State, City])],
    providers: [StateService, CityService],
    controllers: [StateController, CityController]
})
export class CityModule {}


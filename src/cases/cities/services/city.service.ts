import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { City } from "../entities/city.entity";


@Injectable()
export class CityService {
    update(id: string, city: City) {
        throw new Error("Method not implemented.");
    }
    delete(id: string) {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(City)
        private readonly repository: Repository<City>
    ) {}

    findAll(): Promise<City[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<City | null> {
        return this.repository.findOneBy({id: id});
    }

    save(city: City): Promise<City> {
        return this.repository.save(city);
    }

    async remove(id: string):Promise<void> {

        await this.repository.delete(id);
    }
} 


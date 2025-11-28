import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Brand } from "./brand.entity";

@Injectable()
export class BrandService {
    update(id: string, brand: Brand) {
        throw new Error("Method not implemented.");
    }
    delete(id: string) {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Brand)
        private readonly repository: Repository<Brand>
    ) {}

    findAll(): Promise<Brand[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Brand | null> {
        return this.repository.findOneBy({id: id});
    }

    save(brand: Brand): Promise<Brand> {
        return this.repository.save(brand);
    }

    async remove(id: string):Promise<void> {

        await this.repository.delete(id);
    }
} 


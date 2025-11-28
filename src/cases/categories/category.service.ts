import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService {
    update(id: string, category: Category) {
        throw new Error("Method not implemented.");
    }
    delete(id: string) {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>
    ) {}

    findAll(): Promise<Category[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Category | null> {
        return this.repository.findOneBy({id: id});
    }

    save(category: Category): Promise<Category> {
        return this.repository.save(category);
    }

    async remove(id: string):Promise<void> {

        await this.repository.delete(id);
    }
} 


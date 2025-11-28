import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Customer } from "./customer.entity";

@Injectable()
export class CustomerService {
    update(id: string, customer: Customer) {
        throw new Error("Method not implemented.");
    }
    delete(id: string) {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(Customer)
        private readonly repository: Repository<Customer>
    ) { }

    findAll(): Promise<Customer[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<Customer | null> {
        return this.repository.findOneBy({ id: id });
    }

    findBySupabaseId(supabaseId: string): Promise<Customer | null> {
        return this.repository.findOneBy({ supabaseId: supabaseId });
    }

    save(customer: Customer): Promise<Customer> {
        return this.repository.save(customer);
    }

    async remove(id: string): Promise<void> {

        await this.repository.delete(id);
    }
}


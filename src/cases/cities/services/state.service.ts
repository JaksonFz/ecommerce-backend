import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { State } from "../entities/state.entity";


@Injectable()
export class StateService {
    update(id: string, state: State) {
        throw new Error("Method not implemented.");
    }

    delete(id: string) {
        throw new Error("Method not implemented.");
    }

    constructor(
        @InjectRepository(State)
        private readonly repository: Repository<State>
    ) {}

    findAll(): Promise<State[]> {
        return this.repository.find();
    }

    findById(id: string): Promise<State | null> {
        return this.repository.findOneBy({id: id});
    }

    save(state: State): Promise<State> {
        return this.repository.save(state);
    }

    async remove(id: string):Promise<void> {

        await this.repository.delete(id);
    }
} 


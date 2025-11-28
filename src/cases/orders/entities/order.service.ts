import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { Customer } from 'src/cases/customers/customer.entity';

@Injectable()
export class OrderService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, order: Order) {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  findAll(customer?: Customer | null): Promise<Order[]> {
    if (!customer) {
      return this.repository.find();
    } else {
      return this.repository.find({
        where: { customer: customer },
        relations: ['customer'],
      });
    }
  }

  findById(id: string): Promise<Order | null> {
    return this.repository.findOneBy({ id: id });
  }

  save(order: Order): Promise<Order> {
    const total = order.items.reduce((sum, item) => {
      return sum + Number(item.quantity) + Number(item.value);
    }, 0);

    order.total = total;

    return this.repository.save(order);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
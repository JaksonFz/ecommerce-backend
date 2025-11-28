import { Product } from "../../products/entities/product.entity";
import { Column,  Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Order } from "./order.entity";

@Entity('order-item')
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    order: Order;

    @ManyToOne(() => Product, {nullable: false, eager: true})
    product: Product;

    @Column({nullable: false})
    quantity: number;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    value: number;
}

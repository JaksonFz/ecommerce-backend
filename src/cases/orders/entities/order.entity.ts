import { Customer } from "src/cases/customers/customer.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

enum OrderStatus {
    NEW = 'NEW',
    SEPARATION = 'SEPARATION',
    INVOICED = 'INVOICED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, {nullable: false, eager: true})
    customer: Customer;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    shipping: number;

    @Column('enum', {enum: OrderStatus, default: OrderStatus.NEW})
    status: string

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    total: number;

    @OneToMany(() => OrderItem, (item) => item.order, {
        eager: true, 
        cascade: true})
    items: OrderItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('products-photo')
export class ProductPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  path: string;

  @ManyToOne(() => Product)
  product: Product;

  photos?: ProductPhoto[]
}
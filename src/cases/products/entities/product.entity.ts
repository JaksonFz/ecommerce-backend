import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/category.entity';
import { Brand } from '../../brands/brand.entity';
import { ProductPhoto } from './product-photo.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { nullable: false, precision: 10, scale: 2 })
  price: number;

  @Column('boolean', { nullable: false, default: true })
  active: boolean;

  @ManyToOne(() => Category, { eager: true, nullable: false })
  category: Category;

  @ManyToOne(() => Brand, { eager: false, nullable: true })
  brand: Brand;

  @OneToMany(() => ProductPhoto, (photo) => photo.product, {
    eager: true,
    cascade: true,
  })
  photos?: ProductPhoto[];
}
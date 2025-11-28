import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '../../categories/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) { }

  findAll(category?: Category | null, search?: string): Promise<Product[]> {
    if (search && !category) {
      return this.repository
        .createQueryBuilder('product')
        .where(
          'LOWER(product.name) LIKE :search OR LOWER(product.description) LIKE :search',
          { search: `%${search.toLowerCase()}%` },
        )
        .leftJoinAndSelect('product.category', 'category')
        .getMany();
    }

    if (search && category) {
      return this.repository
        .createQueryBuilder('product')
        .where('product.categoryId = :categoryId', { categoryId: category.id })
        .andWhere(
          'LOWER(product.name) LIKE :search OR LOWER(product.description) LIKE :search',
          { search: `%${search.toLowerCase()}%` },
        )
        .leftJoinAndSelect('product.category', 'category')
        .getMany();
    }

    if (!category) {
      return this.repository.find({ relations: ['category'] });
    }

    return this.repository.find({
      where: { category },
      relations: ['category'],
    });
  }

  findById(id: string): Promise<Product | null> {
    return this.repository.findOneBy({ id });
  }

  save(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

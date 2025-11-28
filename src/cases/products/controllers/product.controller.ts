import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../../categories/category.service';
import { validate as isUUID } from 'uuid';

@Controller('products')
export class ProductController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly service: ProductService,
  ) { }

  @Get()
  async find(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
  ): Promise<Product[]> {
    const searchValue = search || undefined;

    if (categoryId && isUUID(categoryId)) {
      const category = await this.categoryService.findById(categoryId);
      return this.service.findAll(category, searchValue);
    }

    return this.service.findAll(undefined, searchValue);
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Product> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.service.save(product);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Product,
  ): Promise<Product> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    product.id = id;
    return this.service.save(product);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const found = await this.service.findById(id);
    if (!found) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return this.service.remove(id);
  }
}

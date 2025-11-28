import { Controller, Get, Query } from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { ProductService } from '../services/product.service';
import { ProductPhoto } from '../entities/product-photo.entity';
import { ProductPhotoService } from '../services/product-photo.service';

@Controller('product-photos')
export class ProductPhotoController {
  constructor(
    private readonly productService: ProductService,
    private readonly service: ProductPhotoService,
  ) { }
  @Get()
  async find(@Query('productId') productId: string): Promise<ProductPhoto[]> {
    if (productId && isUUID(productId)) {
      const product = await this.productService.findById(productId);
      return this.service.findAll(product);
    }
    return this.service.findAll();
  }
}
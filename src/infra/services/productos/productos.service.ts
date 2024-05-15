import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ProductoEntity } from '../../../core/modules/productos/domain/productos.entity';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { CreateProductoDTO, UpdateProductoDTO } from '../../dtos/productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: Repository<ProductoEntity>,
  ) {}

  findOne(id: string) {
    return this.productoRepository.findOneBy({ id });
  }

  create(payload: CreateProductoDTO) {
    const newProduct = this.productoRepository.create(payload);
    newProduct.id = uuidv4();
    return this.productoRepository.save(newProduct);
  }

  async update(payload: UpdateProductoDTO) {
    const { id } = payload;
    const producto = await this.findOne(id);
    this.productoRepository.merge(producto, payload);
    return this.productoRepository.save(producto);
  }

  delete(id: string) {
    return this.productoRepository.delete(id);
  }

  async findPaginatedAndFiltered(
    pagina: number,
    limite: number,
    nombre?: string,
    precioMinimo?: number,
    precioMaximo?: number,
    enStock?: boolean,
  ) {
    const queryBuilder = this.productoRepository.createQueryBuilder('producto');

    if (nombre) {
      queryBuilder.andWhere('producto.nombre LIKE :nombre', {
        nombre: `%${nombre}%`,
      });
    }
    if (precioMinimo) {
      queryBuilder.andWhere('producto.precio >= :precioMinimo', {
        precioMinimo,
      });
    }
    if (precioMaximo) {
      queryBuilder.andWhere('producto.precio <= :precioMaximo', {
        precioMaximo,
      });
    }
    if (enStock !== undefined) {
      queryBuilder.andWhere('producto.stock > 0 = :enStock', { enStock });
    }

    const [result, total] = await queryBuilder
      .skip((pagina - 1) * limite)
      .take(limite)
      .getManyAndCount();

    return {
      data: result,
      count: total,
      totalPages: Math.ceil(total / limite),
      currentPage: pagina,
    };
  }
}

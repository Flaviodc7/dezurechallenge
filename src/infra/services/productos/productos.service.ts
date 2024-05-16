import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ProductoEntity } from '../../../core/modules/productos/domain/productos.entity';
import { Repository } from 'typeorm';
import { CreateProductoDTO, UpdateProductoDTO } from '../../dtos/productos.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ProductoEntity)
    private productoRepository: Repository<ProductoEntity>,
  ) {}

  async findOne(id: string) {
    try {
      const producto = await this.productoRepository.findOneBy({ id });
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
      return producto;
    } catch (error) {
      throw new BadRequestException(
        `Falla al buscar el producto: ${error.message}`,
      );
    }
  }

  async create(payload: CreateProductoDTO) {
    try {
      const newProducto = this.productoRepository.create(payload);
      return await this.productoRepository.save(newProducto);
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar crear el producto: ${error.message}`,
      );
    }
  }

  async update(payload: UpdateProductoDTO) {
    const { id } = payload;
    try {
      const producto = await this.findOne(id);
      this.productoRepository.merge(producto, payload);
      return await this.productoRepository.save(producto);
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar actualizar el producto: ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      const result = await this.productoRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
      return result;
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar eliminar el producto: ${error.message}`,
      );
    }
  }

  async findPaginatedAndFiltered(
    pagina: number,
    limite: number,
    nombre?: string,
    precioMinimo?: number,
    precioMaximo?: number,
    enStock?: boolean,
  ) {
    try {
      const queryBuilder =
        this.productoRepository.createQueryBuilder('producto');

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
        if (enStock) {
          queryBuilder.andWhere('producto.stock > 0');
        } else {
          queryBuilder.andWhere('producto.stock = 0');
        }
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
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar obtener productos: ${error.message}`,
      );
    }
  }
}

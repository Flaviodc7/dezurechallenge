import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateProductoDTO, UpdateProductoDTO } from '../../dtos/productos.dto';
import { ProductosService } from '../../services/productos/productos.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @Get(':idProducto')
  @HttpCode(HttpStatus.ACCEPTED)
  getProducto(@Param('idProducto') idProducto: string) {
    return this.productosService.findOne(idProducto);
  }

  @ApiOperation({ summary: 'Crear un producto' })
  @Post()
  create(@Body() payload: CreateProductoDTO) {
    return this.productosService.create(payload);
  }

  @ApiOperation({ summary: 'Modificar un producto' })
  @Put()
  update(@Body() payload: UpdateProductoDTO) {
    return this.productosService.update(payload);
  }

  @ApiOperation({ summary: 'Eliminar un producto' })
  @Delete('/:idProducto')
  deleteProduct(@Param('idProducto') idProducto: string): any {
    return {
      idProducto,
      delete: true,
      count: 1,
    };
  }

  @ApiOperation({ summary: 'Obtener productos filtrados y paginados' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProductos(
    @Query('pagina') pagina: number = 1,
    @Query('limite') limite: number = 10,
    @Query('nombre') nombre?: string,
    @Query('precioMinimo') precioMinimo?: number,
    @Query('precioMaximo') precioMaximo?: number,
    @Query('enStock') enStock?: boolean,
  ) {
    const productos = await this.productosService.findPaginatedAndFiltered(pagina, limite, nombre, precioMinimo, precioMaximo, enStock);
    return productos;
  }
}

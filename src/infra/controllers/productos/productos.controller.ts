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
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import {
  CreateProductoDTO,
  GetProductosDto,
  UpdateProductoDTO,
} from '../../dtos/productos.dto';
import { ProductosService } from '../../services/productos/productos.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'pagina',
    required: false,
    description:
      'Número de página (Opcional, debe ser mayor a 0) Valor Default = 1',
    type: Number,
  })
  @ApiQuery({
    name: 'limite',
    required: false,
    description:
      'Número de productos por página (Opcional, debe ser mayor a 0) Valor Default = 10',
    type: Number,
  })
  @ApiQuery({
    name: 'nombre',
    required: false,
    description: 'Nombre del producto (Opcional)',
    type: String,
  })
  @ApiQuery({
    name: 'precioMinimo',
    required: false,
    description: 'Precio mínimo (Opcional, debe ser mayor a 0)',
    type: Number,
  })
  @ApiQuery({
    name: 'precioMaximo',
    required: false,
    description: 'Precio máximo (Opcional, debe ser mayor a 0)',
    type: Number,
  })
  @ApiQuery({
    name: 'enStock',
    required: false,
    description: 'Si el producto está en stock (Opcional)',
    type: Boolean,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProductos(@Query() query: GetProductosDto) {
    const productos = await this.productosService.findPaginatedAndFiltered(
      query.pagina,
      query.limite,
      query.nombre,
      query.precioMinimo,
      query.precioMaximo,
      query.enStock,
    );
    return productos;
  }
}

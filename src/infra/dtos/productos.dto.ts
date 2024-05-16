import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
  Min,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductoDTO {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;
  @ApiProperty({ description: 'Precio del producto (Solo números positivos' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'El precio no puede ser un número negativo' })
  readonly precio: number;
  @ApiProperty({
    description: 'Stock del producto (Solo números enteros y positivos)',
  })
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser un número negativo' })
  @IsNotEmpty()
  readonly stock: number;
  @ApiProperty({ description: 'Origen del producto' })
  @IsString()
  @IsNotEmpty()
  readonly origen: string;
  @ApiProperty({ description: 'Imagen del producto' })
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateProductoDTO {
  @ApiProperty({ description: 'ID del producto' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @ApiProperty({
    description: 'Nombre del producto (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly nombre?: string;
  @ApiProperty({
    description: 'Descripción del producto (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly descripcion?: string;
  @ApiProperty({
    description: 'Precio del producto (opcional)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'El precio no puede ser un número negativo' })
  readonly precio?: number;
  @ApiProperty({
    description:
      'Stock del producto (Solo números enteros y positivos) (opcional)',
    required: false,
  })
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser un número negativo' })
  @IsNotEmpty()
  readonly stock?: number;
  @ApiProperty({
    description: 'Origen del producto (opcional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly origen?: string;
  @ApiProperty({
    description: 'Imagen del producto (opcional)',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  readonly imagen?: string;
}

export class GetProductosDto {
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'El número de página debe ser al menos 1' })
  @Type(() => Number)
  pagina?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'El limite debe ser al menos 1' })
  @Type(() => Number)
  limite?: number = 10;

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'El precio mínimo no puede ser negativo' })
  @Type(() => Number)
  precioMinimo?: number;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'El precio máximo no puede ser negativo' })
  @Type(() => Number)
  precioMaximo?: number;

  @IsOptional()
  @IsBoolean()
  enStock?: boolean;
}

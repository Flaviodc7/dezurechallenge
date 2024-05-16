import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDTO {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;
  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly precio: number;
  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
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
  readonly precio?: number;
  @ApiProperty({
    description: 'Stock del producto (opcional)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
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

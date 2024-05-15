import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDTO {
  @ApiProperty({
    description: 'ID del usuario (puede ser DNI u otra documentación)',
  })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  @ApiProperty({ description: 'Descripción del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ description: 'Precio del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly rol: string;
}

export class UpdateUsuarioDTO {
  @ApiProperty({ description: 'ID del usuario' })
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @ApiProperty({ description: 'Nombre del usuario (opcional)' })
  @IsOptional()
  @IsString()
  readonly nombre: string;
  @ApiProperty({ description: 'Email del usuario (opcional)' })
  @IsOptional()
  @IsString()
  readonly email: string;
  @ApiProperty({ description: 'Rol del usuario (opcional)' })
  @IsOptional()
  @IsString()
  readonly rol: string;
}

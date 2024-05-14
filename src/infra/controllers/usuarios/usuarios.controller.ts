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
} from '@nestjs/common';
import { CreateUsuarioDTO, UpdateUsuarioDTO } from '../../dtos/usuarios.dto';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @Get(':idUsuario')
  @HttpCode(HttpStatus.ACCEPTED)
  getUsuario(@Param('idUsuario') idUsuario: string) {
    return this.usuariosService.findOne(idUsuario);
  }

  @ApiOperation({ summary: 'Crear un usuario' })
  @Post()
  create(@Body() payload: CreateUsuarioDTO) {
    return this.usuariosService.create(payload);
  }

  @ApiOperation({ summary: 'Modificar un usuario' })
  @Put()
  update(@Body() payload: UpdateUsuarioDTO) {
    return this.usuariosService.update(payload);
  }

  @ApiOperation({ summary: 'Eliminar un usuario' })
  @Delete('/:idUsuario')
  deleteUsuario(@Param('idUsuario') idUsuario: string): any {
    return {
      idUsuario,
      delete: true,
      count: 1,
    };
  }
}

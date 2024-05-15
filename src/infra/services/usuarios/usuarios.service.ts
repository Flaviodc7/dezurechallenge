import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { UsuarioEntity } from '../../../core/modules/usuarios/domain/usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDTO, UpdateUsuarioDTO } from '../../dtos/usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async findOne(id: string) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return usuario;
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar encontrar el usuario: ${error.message}`,
      );
    }
  }

  async create(payload: CreateUsuarioDTO) {
    try {
      const newUsuario = this.usuarioRepository.create(payload);
      return await this.usuarioRepository.save(newUsuario);
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar crear el usuario: ${error.message}`,
      );
    }
  }

  async update(payload: UpdateUsuarioDTO) {
    const { id } = payload;
    try {
      const usuario = await this.findOne(id);
      this.usuarioRepository.merge(usuario, payload);
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar actualizar usuario: ${error.message}`,
      );
    }
  }

  async delete(id: string) {
    try {
      const result = await this.usuarioRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      return result;
    } catch (error) {
      throw new BadRequestException(
        `Falla al intentar eliminar usuario: ${error.message}`,
      );
    }
  }
}

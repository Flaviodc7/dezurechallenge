import { Injectable } from '@nestjs/common';
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

  findOne(id: string) {
    return this.usuarioRepository.findOneBy({ id });
  }

  create(payload: CreateUsuarioDTO) {
    const newProduct = this.usuarioRepository.create(payload);
    return this.usuarioRepository.save(newProduct);
  }

  async update(payload: UpdateUsuarioDTO) {
    const { id } = payload;
    const producto = await this.findOne(id);
    this.usuarioRepository.merge(producto, payload);
    return this.usuarioRepository.save(producto);
  }

  delete(id: string) {
    return this.usuarioRepository.delete(id);
  }
}

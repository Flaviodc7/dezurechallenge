import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './infra/controllers/usuarios/usuarios.controller';
import { ProductosController } from './infra/controllers/productos/productos.controller';
import { ProductosService } from './infra/services/productos/productos.service';
import { UsuariosService } from './infra/services/usuarios/usuarios.service';

@Module({
  imports: [],
  controllers: [AppController, UsuariosController, ProductosController],
  providers: [AppService, ProductosService, UsuariosService],
})
export class AppModule {}

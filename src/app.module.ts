import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosController } from './infra/controllers/usuarios/usuarios.controller';
import { ProductosController } from './infra/controllers/productos/productos.controller';
import { ProductosService } from './infra/services/productos/productos.service';
import { UsuariosService } from './infra/services/usuarios/usuarios.service';
import config from './infra/db/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from './core/modules/productos/domain/productos.entity';
import { UsuarioEntity } from './core/modules/usuarios/domain/usuarios.entity';
import { DatabaseModule } from './infra/db/database.module';
import { LoggerMiddleware } from './infra/middleware/logger.middleware';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProductoEntity, UsuarioEntity]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true
    }),
    DatabaseModule
  ],
  controllers: [AppController, UsuariosController, ProductosController],
  providers: [AppService, ProductosService, UsuariosService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  rol: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  rol: string;
}

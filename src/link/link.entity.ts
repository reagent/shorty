import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('links')
export class Link {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 2000 })
  url: string;

  @Exclude()
  @Column({ length: 32, name: 'url_hash' })
  urlHash: string;

  @Exclude()
  @Column({ length: 6 })
  code: string;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  get shortLink(): string {
    return `http://localhost:3000/{ $code }`;
  }
}

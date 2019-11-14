import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("links")
export class Link { 
  @PrimaryGeneratedColumn()
  id: number

  @Column({length: 2000})
  url: string

  @Column({length: 6})
  code: string
}
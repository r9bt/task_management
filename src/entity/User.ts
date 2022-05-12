import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
  @Column()
  @IsNotEmpty()
  name!: string;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Column()
  @IsNotEmpty()
  password!: string;

  @PrimaryGeneratedColumn()
  id!: number;
}

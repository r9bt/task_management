import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  content!: string;

  @Column()
  userId?: number;

  @Column({
    default: false,
  })
  @IsNotEmpty()
  isCompleted!: boolean;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  content: string;

  @Column({
    type: "boolean",
    default: false,
    nullable: false,
  })
  isCompleted: boolean;
}

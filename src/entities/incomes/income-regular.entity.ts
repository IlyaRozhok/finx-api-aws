import { Type } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("regular_incomes")
export class RegularIncomes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Type(() => Number)
  @Column({ name: "amount", type: "int", nullable: false })
  amount: number;

  @Column({ name: "description", type: "varchar", length: 50 })
  description: string;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  updatedAt: Date;
}

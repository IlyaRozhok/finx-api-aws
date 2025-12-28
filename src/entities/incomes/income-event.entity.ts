import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("event_incomes")
export class EventIncomes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ name: "amount", type: "int" })
  amount: number;

  @Column({ name: "description", type: "varchar", length: 50 })
  description: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "timestamptz", default: () => "NOW()" })
  createdAt: Date;
}

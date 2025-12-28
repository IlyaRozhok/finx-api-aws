import { Debt } from "@/entities/debt.entity";
import { Installment } from "@/entities/installment.entity";
import { RecurringExpense } from "@/entities/recurring-expense.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: "google_sub", unique: true, type: "text" })
  googleSub: string;

  @Column({ name: "user_name", length: 150 })
  userName: string;

  @Column({ name: "avatar_url", type: "text", nullable: true })
  avatarUrl: string | null;

  @Column({ name: "is_onboarded", type: "boolean", default: false })
  isOnboarded: boolean;

  @Column({ name: "incomes", type: "int", default: 0 })
  incomes: number;

  @Column({ name: "currency", type: "char", length: 3, default: "UAH" })
  currency: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;

  @OneToMany(() => RecurringExpense, (e) => e.user)
  recurringExpenses: RecurringExpense[];
  @OneToMany(() => Installment, (i) => i.user) installments: Installment[];
  @OneToMany(() => Debt, (d) => d.user) debts: Debt[];
}

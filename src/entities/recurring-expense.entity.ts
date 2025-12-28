import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

import { User } from "@/entities/user.entity";
import { Category } from "@/entities/onboarding.entity";

@Entity("recurring_expense")
export class RecurringExpense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @ManyToOne(() => User, (u) => u.recurringExpenses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "category_id", type: "uuid" })
  categoryId: string;

  @ManyToOne(() => Category, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "numeric", precision: 14, scale: 2 })
  amount: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}

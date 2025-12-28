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
import { Category } from "../entities/onboarding.entity";
import { Installment } from "../entities/installment.entity";
import { Debt } from "../entities/debt.entity";
import { DecimalTransformer } from "@/shared/decimal.transformer";
import { TransactionDirection, TransactionType } from "@/transactions/types";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ type: "enum", enum: TransactionType, enumName: "transaction_type" })
  type: TransactionType;

  @Column({
    type: "enum",
    enum: TransactionDirection,
    enumName: "transaction_direction",
  })
  direction: TransactionDirection;

  @Column({
    type: "numeric",
    precision: 14,
    scale: 2,
    transformer: DecimalTransformer,
  })
  amount: string;

  @Index("idx_transactions_user_occurred_at", ["userId", "occurredAt"])
  @Column({ name: "occurred_at", type: "timestamptz" })
  occurredAt: Date;

  @ManyToOne(() => Category, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  category?: Category | null;

  @ManyToOne(() => Installment, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "installment_id" })
  installment?: Installment | null;

  @ManyToOne(() => Debt, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "debt_id" })
  debt?: Debt | null;

  @Column({ type: "text", nullable: true })
  note?: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}

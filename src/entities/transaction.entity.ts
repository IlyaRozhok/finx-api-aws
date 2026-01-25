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
import { Category } from "@/entities/onboarding.entity";
import { Installment } from "@/entities/installment.entity";
import { Debt } from "@/entities/debt.entity";
import { DecimalTransformer } from "@/shared/decimal.transformer";
import {
  TransactionDirection,
  TransactionType,
} from "@/modules/transactions/types";
import { Accounts } from "@/entities/accounts.entity";
import { AccountProvider } from "@/shared/enums";

@Index("uniq_tx_provider_external", ["userId", "provider", "externalId"], {
  unique: true,
})
@Index("idx_tx_user_account_occurred", ["userId", "accountId", "occurredAt"])
@Index("idx_tx_user_category_occurred", ["userId", "categoryId", "occurredAt"])
@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ name: "external_id", type: "text", nullable: true })
  externalId?: string | null;

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

  @Column({
    type: "enum",
    enum: AccountProvider,
    default: AccountProvider.MANUAL,
  })
  provider: AccountProvider;

  @Column({ name: "occurred_at", type: "timestamptz" })
  occurredAt: Date;

  @Column({ name: "category_id", type: "uuid", nullable: true })
  categoryId?: string | null;

  @ManyToOne(() => Category, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  category?: Category | null;

  @Column({ name: "installment_id", type: "uuid", nullable: true })
  installmentId?: string | null;

  @ManyToOne(() => Installment, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "installment_id" })
  installment?: Installment | null;

  @Column({ name: "debt_id", type: "uuid", nullable: true })
  debtId?: string | null;

  @ManyToOne(() => Debt, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "debt_id" })
  debt?: Debt | null;

  @Column({ type: "text", nullable: true })
  note?: string | null;

  @Column({ name: "account_id", type: "uuid", nullable: true })
  accountId?: string | null;

  @ManyToOne(() => Accounts, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "account_id" })
  account?: Accounts | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}

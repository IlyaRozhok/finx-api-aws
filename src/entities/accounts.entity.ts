import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  AccountAssetType,
  AccountProvider,
  AccountType,
  Status,
} from "@/shared/enums";

@Entity("accounts")
@Index("idx_accounts_user", ["userId"])
export class Accounts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ type: "enum", enum: AccountType })
  type: AccountType;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  description?: string | null;

  @Column({ name: "asset_code", type: "varchar", length: 10 })
  assetCode: string;

  @Column({
    name: "provider",
    type: "enum",
    enum: AccountProvider,
    default: AccountProvider.MANUAL,
  })
  provider: AccountProvider;

  @Column({
    name: "asset_type",
    type: "enum",
    enum: AccountAssetType,
    default: AccountAssetType.FIAT,
  })
  assetType: AccountAssetType;

  @Column({
    name: "status",
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({ name: "external_id", type: "text", nullable: true })
  externalId?: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Status, UserIntegrationsProvider } from "@/shared/enums";

@Entity("user-integrations")
@Index("idx_user_integrations_user", ["userId"])
@Index("idx_user_integrations_user_provider", ["userId", "provider"], {
  unique: true,
})
@Index("idx_user_integrations_status", ["status"])
export class UserIntegrations {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @Column({ name: "provider", type: "enum", enum: UserIntegrationsProvider })
  provider: UserIntegrationsProvider;

  @Column({ name: "encrypted_token", type: "text" })
  encryptedToken: string;

  @Column({ name: "last_synced_at", type: "timestamptz", nullable: true })
  lastSyncedAt?: Date | null;

  @Column({
    name: "status",
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
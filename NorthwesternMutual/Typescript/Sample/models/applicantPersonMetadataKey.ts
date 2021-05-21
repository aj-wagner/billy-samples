import {
  Table,
  PrimaryKey,
  Default,
  DataType,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Company from './company';
import User from './account';

@Table
class ApplicantPersonMetadataKey extends Model<ApplicantPersonMetadataKey> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  key?: string;

  @Column
  label?: string;

  // Foreign keys
  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId?: string;

  @BelongsTo(() => Company)
  company?: Company;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId?: string;

  @BelongsTo(() => User)
  user?: User;
  // END -- Foreign keys

  // Timestamps
  @Column
  @CreatedAt
  createdAt?: Date;

  @Column
  @UpdatedAt
  updatedAt?: Date;

  @Column
  @DeletedAt
  deletedAt?: Date;
  // END -- Timestamps
}

export default ApplicantPersonMetadataKey;

import {
  Table,
  PrimaryKey,
  Default,
  DataType,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';
import Company from './company';
import User from './account';
import ApplicantDatabase from './applicantDatabase';
import ApplicantPersonMetadataKey from './applicantPersonMetadataKey';

@Table
class ApplicantDatabaseField extends Model<ApplicantDatabaseField> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  // Foreign keys
  @ForeignKey(() => ApplicantDatabase)
  @Column(DataType.UUID)
  databaseId?: string;

  @BelongsTo(() => ApplicantDatabase)
  database?: ApplicantDatabase;

  @ForeignKey(() => ApplicantPersonMetadataKey)
  @Column(DataType.UUID)
  keyId?: string;

  @BelongsTo(() => ApplicantPersonMetadataKey)
  metadata?: ApplicantPersonMetadataKey;

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

export default ApplicantDatabaseField;

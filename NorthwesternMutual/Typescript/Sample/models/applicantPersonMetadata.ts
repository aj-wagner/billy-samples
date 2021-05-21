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
import ApplicantPerson from './applicantPerson';
import Company from './company';
import ApplicantPersonMetadataKey from './applicantPersonMetadataKey';
import User from './account';

@Table
class ApplicantPersonMetadata extends Model<ApplicantPersonMetadata> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  value?: string;

  // Foreign keys
  @ForeignKey(() => ApplicantPerson)
  @Column(DataType.UUID)
  candidateId!: string;

  @BelongsTo(() => ApplicantPerson)
  candidate?: ApplicantPerson;

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId!: string;

  @BelongsTo(() => Company)
  company?: Company;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId?: string;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => ApplicantPersonMetadataKey)
  @Column(DataType.UUID)
  keyId!: string;

  @BelongsTo(() => ApplicantPersonMetadataKey)
  metadata?: ApplicantPersonMetadataKey;
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

export default ApplicantPersonMetadata;

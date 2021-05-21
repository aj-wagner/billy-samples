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
  HasMany,
} from 'sequelize-typescript';
import Company from './company';
import ApplicantDatabaseItem from './applicantDatabaseItem';
import ApplicantPersonMetadata from './applicantPersonMetadata';

@Table
class ApplicantPerson extends Model<ApplicantPerson> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  firstName?: string;

  @Column
  lastName?: string;

  @Column
  email?: string;

  // Foreign keys
  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId?: string;

  @BelongsTo(() => Company)
  company?: Company;

  @HasMany(() => ApplicantDatabaseItem)
  databaseItems?: ApplicantDatabaseItem[];

  @HasMany(() => ApplicantPersonMetadata)
  metadatas?: ApplicantPersonMetadata[];
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
}

export default ApplicantPerson;

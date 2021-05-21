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
import ApplicantDatabase from './applicantDatabase';
import Company from './company';
import User from './account';
import ApplicantPerson from './applicantPerson';

@Table
class ApplicantDatabaseItem extends Model<ApplicantDatabaseItem> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  /* -- Foreign keys -- */
  @ForeignKey(() => ApplicantPerson)
  @Column(DataType.UUID)
  candidateId?: string;

  @BelongsTo(() => ApplicantPerson)
  candidate?: ApplicantPerson;

  @ForeignKey(() => ApplicantDatabase)
  @Column(DataType.UUID)
  databaseId?: string;

  @BelongsTo(() => ApplicantDatabase)
  database?: ApplicantDatabase;

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
  /* -- END - Foreign keys -- */

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

export default ApplicantDatabaseItem;

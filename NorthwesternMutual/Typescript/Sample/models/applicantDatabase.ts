import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  DataType,
  PrimaryKey,
  Default,
  HasMany,
} from 'sequelize-typescript';
import Company from './company';
import User from './account';
import ApplicantDatabaseItem from './applicantDatabaseItem';
import ApplicantDatabaseField from './applicantDatabaseField';

@Table
class ApplicantDatabase extends Model<ApplicantDatabase> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  name?: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId?: string;

  @BelongsTo(() => User)
  user?: User;

  // Foreign keys
  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId?: string;

  @BelongsTo(() => Company)
  company?: Company;

  @HasMany(() => ApplicantDatabaseField)
  fields?: ApplicantDatabaseField[];

  @HasMany(() => ApplicantDatabaseItem)
  applicants?: ApplicantDatabaseItem[];
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

export default ApplicantDatabase;

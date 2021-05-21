import {
  Table,
  Column,
  DeletedAt,
  Model,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
  DataType,
} from 'sequelize-typescript';
import User from './account';
import Company from './company';
import ApplicantDatabase from './applicantDatabase';

@Table
class Email extends Model<Email> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  name!: string;

  @Column
  subject?: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId!: string;

  @BelongsTo(() => Company)
  company?: Company;

  @ForeignKey(() => ApplicantDatabase)
  @Column(DataType.UUID)
  databaseId!: string;

  @BelongsTo(() => ApplicantDatabase)
  database?: ApplicantDatabase;

  @Column(DataType.JSONB)
  content?: object;

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

export default Email;

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

@Table
class Scheduler extends Model<Scheduler> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  name!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId?: string;

  @BelongsTo(() => Company)
  company?: Company;

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

export default Scheduler;

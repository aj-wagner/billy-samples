import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  BelongsTo,
  DataType,
  PrimaryKey,
  Default,
} from 'sequelize-typescript';
import Company from './company';

@Table
class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId!: string;

  @BelongsTo(() => Company)
  company?: Company;

  @Column
  password!: string;

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

export default User;

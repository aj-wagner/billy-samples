import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  PrimaryKey,
  DataType,
  Default,
} from 'sequelize-typescript';
import User from './account';

@Table
class Company extends Model<Company> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  companyName!: string;

  @HasMany(() => User)
  users?: User[];

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

export default Company;

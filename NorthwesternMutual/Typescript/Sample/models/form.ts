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
import User from './account';
import Company from './company';

@Table
class Form extends Model<Form> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  name?: string;

  @Column(DataType.JSONB)
  formData?: object;

  // Foreign keys
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId?: string;

  @BelongsTo(() => User)
  user?: User;

  @ForeignKey(() => Company)
  @Column(DataType.UUID)
  companyId?: string;

  @BelongsTo(() => Company)
  company?: Company;
  // END - Foreign keys

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
  // END - Timestamps
}

export default Form;

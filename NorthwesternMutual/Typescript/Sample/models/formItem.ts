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
} from 'sequelize-typescript';
import Form from './form';

@Table
export class FormItem extends Model<FormItem> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column
  index?: number;

  @Column(DataType.JSONB)
  data?: object;

  // Foreign Keys
  @ForeignKey(() => Form)
  @Column(DataType.UUID)
  formId?: string;

  @BelongsTo(() => Form)
  form?: Form;
  // END - Foreign Keys

  // Timestamps
  @Column
  @CreatedAt
  createdAt?: Date;

  @Column
  @UpdatedAt
  updatedAt?: Date;

  @Column
  @UpdatedAt
  deletedAt?: Date;
  // END - Timestamps
}

export default FormItem;

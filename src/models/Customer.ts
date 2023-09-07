import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/database';

class Customer extends Model {
  public id!: number;
  public name!: string;
  public mobileNumber!: string;
  public lastDrawDate!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    name: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    lastDrawDate: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'customers',
  }
);

export default Customer;
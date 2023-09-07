import { Model, DataTypes } from 'sequelize';
import sequelize from '../../db/database';

class Prize extends Model {
  public id!: number;
  public category!: string;
  public name!: string;
  public totalQuota!: number;
  public dailyQuota!: number;
  public remainingQuota!: number;
  public probability!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Prize.init(
  {
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    totalQuota: DataTypes.INTEGER,
    dailyQuota: DataTypes.INTEGER,
    remainingQuota: DataTypes.INTEGER,
    probability: DataTypes.FLOAT,
  },
  {
    sequelize,
    tableName: 'prizes',
  }
);

export default Prize;
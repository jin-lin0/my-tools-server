const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const MarketApp = sequelize.define(
  "MarketApp",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    version: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "1.0.0",
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    fileContent: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    screenshots: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    readme: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isOfficial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    downloads: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "market_apps",
    timestamps: true,
  },
);

module.exports = MarketApp;

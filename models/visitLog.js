const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VisitLog = sequelize.define(
  "VisitLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "",
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "visit_logs",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["date", "path", "country", "city"],
      },
    ],
  }
);

module.exports = VisitLog;

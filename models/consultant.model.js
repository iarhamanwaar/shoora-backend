const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Consultant = sequelize.define("Consultant", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  license: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  certificates: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Consultant;

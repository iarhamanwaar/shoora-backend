const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const SuperAdmin = sequelize.define("SuperAdmin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

SuperAdmin.associate = (models) => {
  SuperAdmin.hasMany(models.Admin, {
    foreignKey: "superAdminId",
    as: "admins",
  });
};

module.exports = SuperAdmin;

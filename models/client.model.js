const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Client = sequelize.define("Client", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  googleSignIn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  microsoftSignIn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  appleSignIn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  otpSignIn: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Client.associate = (models) => {
  Client.hasMany(models.Consultation, {
    foreignKey: "clientId",
    as: "consultations",
  });
};

module.exports = Client;

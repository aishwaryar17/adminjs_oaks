const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('IntegrationPartners', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    clientId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    clientSecret: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    secretKey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    webHookToken: {
      type: DataTypes.JSON,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    partnerEndpoints: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'IntegrationPartners',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "IntegrationPartners_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "integration_partners_id",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

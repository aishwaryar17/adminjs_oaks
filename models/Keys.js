const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Keys', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    scienerKeyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    key: {
      type: DataTypes.JSON,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dahaoDeviceId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    psk: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Keys',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Keys_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "keys_dahao_device_id",
        fields: [
          { name: "dahaoDeviceId" },
        ]
      },
    ]
  });
};

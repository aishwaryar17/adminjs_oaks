const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Groups', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Groups',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Groups_key_key",
        unique: true,
        fields: [
          { name: "key" },
        ]
      },
      {
        name: "Groups_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

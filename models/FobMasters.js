const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FobMasters', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fobNumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'FobMasters',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "FobMasters_fobNumber_key",
        unique: true,
        fields: [
          { name: "fobNumber" },
        ]
      },
      {
        name: "FobMasters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

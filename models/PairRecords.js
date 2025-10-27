const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PairRecords', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lockMac: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    serialNo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    errorCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    errorMsg: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PairRecords',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "PairRecords_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

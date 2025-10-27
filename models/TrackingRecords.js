const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TrackingRecords', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    locks: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TrackingRecords',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "TrackingRecords_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

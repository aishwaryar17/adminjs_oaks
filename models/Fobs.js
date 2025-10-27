const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Fobs', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    scienerCardId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fobNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fobName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    startDate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    endDate: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    startTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    endTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cycleType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lockId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    entryLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    slot: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Fobs',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Fobs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

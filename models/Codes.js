const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Codes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    scienerCodeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    issueAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lockId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createType: {
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
    isBlacklisted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    entryLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    idx: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cardNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    groupId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    slot: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Codes',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Codes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "codes_group_id_code",
        fields: [
          { name: "groupId" },
          { name: "code" },
        ]
      },
      {
        name: "codes_lock_id_code",
        fields: [
          { name: "lockId" },
          { name: "code" },
        ]
      },
    ]
  });
};

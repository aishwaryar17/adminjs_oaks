const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Commands', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lockId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    command: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    commandType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    commandInJson: {
      type: DataTypes.JSON,
      allowNull: true
    },
    dataId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    response: {
      type: DataTypes.JSON,
      allowNull: true
    },
    commandCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    identifier: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    retryAttemptLeft: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5
    }
  }, {
    sequelize,
    tableName: 'Commands',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Commands_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

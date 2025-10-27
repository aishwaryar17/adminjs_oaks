const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OauthAccessTokens', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'OauthAccessTokens',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "OauthAccessTokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

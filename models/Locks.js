const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Locks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serialNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    scienerLockId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rentlyLockName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lockMac: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    masterCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    battery: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    info: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    adminKeyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lockType: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "sciener"
    },
    dahaoDeviceId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    timezoneOffset: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    companyTZ: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    batchNumber: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    batteryDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    integrationPartnerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    initializedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    imsi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    imei: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    devicetype: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lastTimeSync: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deviceDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    dstFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    publicKey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    aesKey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sharedSecret: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fotaStatus: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    dynamicAeskey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dynamicAeskeyExpiration: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dynamicSessionActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    iotCertificates: {
      type: DataTypes.JSON,
      allowNull: true
    },
    stateTimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    keyCode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qrCodeCryptoInfo: {
      type: DataTypes.JSON,
      allowNull: true
    },
    commandQueue: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    commandIdentifier: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 10000
    },
    elevatorMode: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    wiegandMode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    groupId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    directAccessMode: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    receivedUnlockAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lockData: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dynamicKeyTimestamp: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    bleCache: {
      type: DataTypes.JSON,
      allowNull: true
    },
    document_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    published_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    created_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updated_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    locale: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Locks',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Locks_created_by_id_fk",
        fields: [
          { name: "created_by_id" },
        ]
      },
      {
        name: "Locks_documents_idx",
        fields: [
          { name: "document_id" },
          { name: "locale" },
          { name: "published_at" },
        ]
      },
      {
        name: "Locks_lockMac_unique_constraint",
        unique: true,
        fields: [
          { name: "lockMac" },
        ]
      },
      {
        name: "Locks_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "Locks_updated_by_id_fk",
        fields: [
          { name: "updated_by_id" },
        ]
      },
      {
        name: "locks_batchNumber_keycode_index",
        fields: [
          { name: "keyCode" },
          { name: "batchNumber" },
        ]
      },
      {
        name: "locks_dahao_device_id",
        fields: [
          { name: "dahaoDeviceId" },
        ]
      },
      {
        name: "locks_serial_no",
        fields: [
          { name: "serialNo" },
        ]
      },
    ]
  });
};

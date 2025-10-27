var DataTypes = require("sequelize").DataTypes;
var _Codes = require("./Codes");
var _Commands = require("./Commands");
var _FobMasters = require("./FobMasters");
var _Fobs = require("./Fobs");
var _Groups = require("./Groups");
var _IntegrationPartners = require("./IntegrationPartners");
var _Keys = require("./Keys");
var _Locks = require("./Locks");
var _OauthAccessTokens = require("./OauthAccessTokens");
var _PairRecords = require("./PairRecords");
var _SequelizeMeta = require("./SequelizeMeta");
var _TrackingRecords = require("./TrackingRecords");
var _Users = require("./Users");

function initModels(sequelize) {
  var Codes = _Codes(sequelize, DataTypes);
  var Commands = _Commands(sequelize, DataTypes);
  var FobMasters = _FobMasters(sequelize, DataTypes);
  var Fobs = _Fobs(sequelize, DataTypes);
  var Groups = _Groups(sequelize, DataTypes);
  var IntegrationPartners = _IntegrationPartners(sequelize, DataTypes);
  var Keys = _Keys(sequelize, DataTypes);
  var Locks = _Locks(sequelize, DataTypes);
  var OauthAccessTokens = _OauthAccessTokens(sequelize, DataTypes);
  var PairRecords = _PairRecords(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var TrackingRecords = _TrackingRecords(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);


  return {
    Codes,
    Commands,
    FobMasters,
    Fobs,
    Groups,
    IntegrationPartners,
    Keys,
    Locks,
    OauthAccessTokens,
    PairRecords,
    SequelizeMeta,
    TrackingRecords,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

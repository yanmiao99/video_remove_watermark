const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShortLink extends Model {
    static associate(models) {}
  }
  ShortLink.init(
    {
      link: DataTypes.TEXT,
      shortLink: DataTypes.TEXT,
      isDelete: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // 0 未删除 1 已删除
      },
    },
    {
      sequelize,
      modelName: "ShortLink",
    }
  );
  return ShortLink;
};

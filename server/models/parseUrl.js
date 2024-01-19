const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParseUrl extends Model {
    // 定义类方法 (多表联查)
    static associate(models) {}
  }

  ParseUrl.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // 是否是主键
        autoIncrement: true, // 是否自增
        allowNull: false,
      },
      // 原始URL
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 封面
      photo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 标题
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 视频下载链接
      downurl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // 类型  1 视频 2 图文
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // 图文
      pics: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      isDelete: {
        type: DataTypes.INTEGER,
        defaultValue: 0, // 0 在用 1 删除
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ParseUrl",
    }
  );
  return ParseUrl;
};

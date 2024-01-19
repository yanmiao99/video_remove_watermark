const express = require("express");
const router = express.Router();
const log4js = require("../utils/log4j.js");
const { ShortLink } = require("../models/index.js");
const shortid = require("shortid");

/**
 * 创建一条短链接
 * @param {String} name
 * @return {Object} data
 */

router.post("/generate", async (req, res) => {
  try {
    const { link } = req.body;
    if (!link) {
      log4js.error("缺少link参数");
      return res.send({
        code: 400,
        data: null,
        msg: "缺少link参数",
      });
    }
    let shortLink = shortid.generate();
    const data = await ShortLink.create({
      link,
      shortLink,
    });
    res.send({
      code: 200,
      data: {
        id: data.id,
        link: data.link,
        shortLink: data.shortLink,
      },
      msg: "短链生成成功",
    });
  } catch (err) {
    console.log(err);
    log4js.error(err);
    res.send({
      code: 400,
      msg: "网络错误,请重试 ~ ",
      data: err,
    });
  }
});

// 根据短链接获取原链接
router.get("/getShortLink", async (req, res) => {
  try {
    const { shortLink } = req.query;
    if (!shortLink) {
      log4js.error("缺少shortLink参数");
      return res.send({
        code: 400,
        data: null,
        msg: "缺少shortLink参数",
      });
    }
    const data = await ShortLink.findOne({
      attributes: ["id", "link", "shortLink"],
      where: { isDelete: 0, shortLink },
    });
    res.send({
      code: 200,
      data,
      msg: "获取成功",
    });
  } catch (err) {
    console.log(err);
    log4js.error(err);
    res.send({
      code: 400,
      msg: "网络错误,请重试 ~ ",
      data: err,
    });
  }
});

module.exports = router;

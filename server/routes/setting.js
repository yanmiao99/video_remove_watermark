const express = require('express');
const router = express.Router();
const { Setting } = require('../models/index.js');
const log4js = require('../utils/log4j.js');
const { validateParams } = require('../utils');

// 设置个人信息
router.post(
  '/setInfo',
  validateParams({
    announcement: '缺少必传参数 announcement (公告)',
    platform: '缺少必传参数 platform (平台)',
    author: '缺少必传参数 author (作者)',
    email: '缺少必传参数 email (邮箱)',
    github: '缺少必传参数 github (github)',
    weChat: '缺少必传参数 weChat (微信)',
  }),
  async (req, res) => {
    const { announcement, platform, author, email, github, weChat } = req.body;

    const params = {
      announcement,
      platform,
      author,
      email,
      github,
      weChat,
    };

    // 查询是否存在, 如果存在则修改, 不存在则创建
    const isExistence = await Setting.findOne({
      where: {
        id: 1,
      },
    });

    if (isExistence) {
      try {
        await Setting.update(params, {
          where: {
            id: 1,
          },
        });

        log4js.info('修改信息成功');
        res.send({
          code: 200,
          msg: '修改成功',
          data: {},
        });
      } catch (err) {
        log4js.error(err);
        res.send({
          code: 400,
          msg: '网络错误,请重试 ~ ',
          data: err,
        });
      }
    } else {
      try {
        await Setting.create(params);
        log4js.info('添加信息成功');
        res.send({
          code: 200,
          msg: '添加成功',
          data: {},
        });
      } catch (err) {
        log4js.error(err);
        res.send({
          code: 400,
          msg: '网络错误,请重试 ~ ',
          data: err,
        });
      }
    }
  }
);

// 查询个人信息
router.get('/list', async (req, res) => {
  try {
    const list = await Setting.findAll({
      where: {
        isDelete: 0,
      },
      attributes: {
        // 设置排除的字段
        exclude: ['isDelete'],
      },
    });
    log4js.info('个人信息查询成功');
    res.send({
      code: 200,
      msg: '查询成功',
      data: list?.[0],
    });
  } catch (err) {
    log4js.error(err);
    res.send({
      code: 400,
      msg: '查询失败',
      data: err,
    });
  }
});

module.exports = router;

//@ts-ignore
import request from "@/utils/request";

// 查询设置数据
export const getSettingInfo = (param) => {
  return request({
    method: "get",
    url: "/setting/list",
    data: param,
  });
};

// 设置设置数据
export const setSettingInfo = (param) => {
  return request({
    method: "post",
    url: "/setting/setInfo",
    data: param,
  });
};
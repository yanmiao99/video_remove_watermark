//@ts-ignore
import request from "@/utils/request";

// 查询数据
export const getParseUrlList = (param: any) => {
  return request({
    method: "get",
    url: "/parseUrl/list",
    data: param,
  });
};

import { ElMessage } from "element-plus";

// 时间格式化
function getDateRange(startOffset, endOffset) {
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() + 3600 * 1000 * 24 * startOffset);
  end.setTime(end.getTime() + 3600 * 1000 * 24 * endOffset);
  return [end, start];
}

// 日期选择格式化
export const shortcuts = [
  {
    text: "往后一周",
    value: () => getDateRange(7, 0),
  },
  {
    text: "往后一月",
    value: () => getDateRange(30, 0),
  },
  {
    text: "往后三月",
    value: () => getDateRange(90, 0),
  },
  {
    text: "往后半年",
    value: () => getDateRange(180, 0),
  },
  {
    text: "往后一年",
    value: () => getDateRange(365, 0),
  },
];

// 获取系统色系
export const getTheme = () => {
  let resTheme = "";
  let theme = window.localStorage.getItem("vueuse-color-scheme");
  if (theme === "dark") {
    resTheme = "dark";
  } else if (theme === "light") {
    resTheme = "";
  } else {
    const media = window.matchMedia("(prefers-color-scheme:dark)");
    if (media.matches) {
      resTheme = "dark";
    } else {
      resTheme = "";
    }
  }
  return resTheme;
};

// 复制url
export const copyUrl = (url) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(
      function () {
        ElMessage.success("复制成功");
      },
      function (err) {
        ElMessage.error("复制失败");
      }
    );
  } else {
    const input = document.createElement("input");
    input.setAttribute("readonly", "readonly");
    input.setAttribute("value", url);
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    input.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      ElMessage.success("复制成功");
    } else {
      ElMessage.error("复制失败");
    }
    document.body.removeChild(input);
  }
};

// 下载方法封装
export const downloadFile = (content, fileName = "下载") => {
  let images = [];
  if (Array.isArray(content)) {
    images = content;
  } else {
    images = [content];
  }

  ElMessage.warning("暂未开发");
};

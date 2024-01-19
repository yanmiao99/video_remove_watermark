import { message } from "./AntdGlobal"

export const handleCopyText = (text) => {
  if (!text || text === "") {
    message.error("复制内容不能为空")
    return
  }

  document.addEventListener("copy", function (e) {
    e.clipboardData.setData("text/plain", text)
    e.preventDefault()
  })
  document.execCommand("copy")
  message.success("复制成功")
}

import { CloudDownloadOutlined } from "@ant-design/icons"
import { App, Button, Form, Input, Modal } from "antd"
import { useEffect, useRef } from "react"

import useDebounce from "~hooks/useDebounce"

const DownloadBtn = ({ title = "下载", content }) => {
  const { message, modal } = App.useApp()
  const [fileNameForm] = Form.useForm()

  // 下载文件表单处理
  const DownFileForm = ({ images }) => {
    const inputRef = useRef(null)

    useEffect(() => {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }, [])

    return (
      <Form
        form={fileNameForm}
        onFinish={async (values) => {
          const { filename } = values
          images.forEach((item, index) => {
            const currentIndex = index + 1

            let currentFileName = ""
            if (item.includes(".mp4")) {
              currentFileName = `${filename}.${item.split(".").pop()}`
            } else {
              currentFileName = `${filename}${currentIndex}.jpg`
            }
            // 调用 chrome 的下载方法
            chrome.downloads.download({
              url: item,
              filename: currentFileName
            })
          })
          message.success("下载成功")

          Modal.destroyAll()
        }}
        initialValues={{
          filename: "文件"
        }}>
        <Form.Item
          label="文件名"
          name="filename"
          rules={[
            {
              required: true,
              message: "请输入下载文件名称"
            }
          ]}
          extra={"如果是下载多张图片则会在命名后以序号拼接,例如: 文件1"}>
          <Input
            placeholder="下载文件名称"
            allowClear
            style={{ width: "100%" }}
            ref={inputRef}
          />
        </Form.Item>
      </Form>
    )
  }

  // 下载内容
  const handleDownContent = useDebounce(() => {
    if (!content || content === "" || content.length === 0) {
      message.error("下载内容不能为空")
      return
    }

    let images = []
    if (Array.isArray(content)) {
      images = content
    } else {
      images = [content]
    }
    modal.confirm({
      title: "下载文件重命名",
      content: <DownFileForm images={images} />,
      centered: true,
      icon: null,
      maskClosable: true,
      okText: "确定",
      cancelText: "取消",
      onOk: async () => {
        await fileNameForm.validateFields()
        fileNameForm.submit()
      }
    })
  }, 300)

  return (
    <Button
      type="primary"
      size="small"
      onClick={() => handleDownContent()}
      icon={<CloudDownloadOutlined />}>
      {title}
    </Button>
  )
}
export default DownloadBtn

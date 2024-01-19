import {
  CopyOutlined,
  LinkOutlined,
  ThunderboltOutlined
} from "@ant-design/icons"
import {
  Alert,
  App,
  Button,
  Card,
  Divider,
  Form,
  Image,
  Input,
  Skeleton,
  Space
} from "antd"
import { useEffect, useRef, useState } from "react"

import DownloadBtn from "~components/DownloadBtn"
import FooterBtnGroup from "~components/FooterBtnGroup"
import OneWord from "~components/OneWord"
import useDebounce from "~hooks/useDebounce"
import PlatformList from "~layout/PopupLayout/components/PlatformList"
import { ThemeAntd } from "~theme"
import { handleCopyText } from "~utils"

import "./index.less"

function PopupDetails() {
  const { message } = App.useApp()
  const [dataDetails, setDataDetails] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const inputRef = useRef(null)

  // 提交表单
  const onFinish = useDebounce(async (values) => {
    const reg = /https?:\/\/[^\s]+/g
    const textRes = values.url.match(reg)
    const url = textRes[0]

    setLoading(true)
    setDataDetails({})
    const res = await fetch(
      `http://127.0.0.1:3000/api/parseUrl/query?url=${url}`
    )
    const data = await res.json()

    console.log("data========", data)

    if (data.code === 200) {
      const resData = data.data
      message.success("获取成功")
      setDataDetails(resData)
      setLoading(false)
    } else {
      message.error(data.msg)
      setLoading(false)
    }
  }, 300)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <ThemeAntd>
      <div className="container_wrapper">
        <Alert
          message="本工具仅供学习交流使用，请勿用于商业用途，否则后果自负。"
          type="info"
          showIcon
          style={{ width: "100%" }}
        />

        <h1 className="container_title"> 🛠️ 视频平台水印去除工具 </h1>

        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: "100%" }}>
          <Form.Item
            label="请输入 URL 地址"
            name="url"
            extra={<PlatformList formRef={form} />}
            rules={[
              {
                required: true,
                message: "请输入平台对应的 URL 地址 ~"
              },
              {
                pattern: /http/,
                message: "请输入正确的 URL 地址 ~"
              }
            ]}>
            <Input
              ref={inputRef}
              placeholder="请输入平台对应的 URL 地址 ~"
              allowClear
              addonBefore={<LinkOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              icon={<ThunderboltOutlined />}>
              开 始 处 理
            </Button>
          </Form.Item>
        </Form>

        {loading && <Skeleton active />}

        {dataDetails && JSON.stringify(dataDetails) !== "{}" && (
          <div className="container_content">
            <Card
              title="标题/标签"
              extra={
                <Button
                  type="primary"
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopyText(dataDetails.title)}>
                  复制
                </Button>
              }>
              <p>{dataDetails.title}</p>
            </Card>

            <Card
              title="封面"
              extra={<DownloadBtn title="下载" content={dataDetails.photo} />}>
              <Image
                height={200}
                className="container_content_cover"
                src={dataDetails.photo}
              />
            </Card>

            {dataDetails.type === 2 && (
              <Card
                title="图片内容"
                extra={
                  <DownloadBtn title="下载全部" content={dataDetails.pics} />
                }>
                <Space wrap size="middle" align="start">
                  {dataDetails.pics.map((item) => {
                    return (
                      <div className="container_content_content_img" key={item}>
                        <Image width={105} src={item} />
                      </div>
                    )
                  })}
                </Space>
              </Card>
            )}

            {dataDetails.type === 1 && (
              <Card
                title="视频内容"
                extra={
                  <DownloadBtn title="下载" content={dataDetails.downurl} />
                }>
                <video
                  src={dataDetails.downurl}
                  controls
                  className="container_content_video"
                />
              </Card>
            )}
          </div>
        )}

        <FooterBtnGroup />

        <Divider />

        <OneWord />
      </div>
    </ThemeAntd>
  )
}

export default PopupDetails

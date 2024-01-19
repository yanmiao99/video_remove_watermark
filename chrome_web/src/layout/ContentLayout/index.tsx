import { StyleProvider } from "@ant-design/cssinjs"
import { message, Modal, Spin } from "antd"
import cssText from "data-text:./index.less"
import { useState } from "react"

// import Details from "~components/Details"
import { ThemeAntd } from "~theme"

export const config = {
  matches: ["https://www.xiaohongshu.com/explore/*"]
}

export const getShadowHostId = () => "plasmo_btn"

// 注入元素到定位的元素旁边
// export const getInlineAnchor = () => {
//   return document.querySelector(".follow-button")
// }

// // 注入元素到 body 中
// export const injectShadowHost = () => {
//   const shadowHost = document.createElement("div")
//   shadowHost.id = getShadowHostId()
//   document.body.appendChild(shadowHost)
// }

// 结合 getInlineAnchor 和 mountShadowHost 进行元素注入
export const getInlineAnchor = () => {
  return document.querySelector(
    ".interaction-container .author-wrapper .note-detail-follow-btn"
  )
}

export const mountShadowHost = ({ anchor, shadowHost }) => {
  anchor!.element!.insertBefore(shadowHost!, anchor!.element!.firstChild)

  // 修改关注按钮的样式和父类的样式
  const oDiv = document.querySelector(
    ".interaction-container .author-wrapper .note-detail-follow-btn"
  ) as HTMLElement | null
  if (oDiv) {
    oDiv.style.display = "flex"

    const sonDiv = oDiv.querySelector(".follow-button") as HTMLElement | null
    if (sonDiv) {
      sonDiv.style.transform = "scale(0.8)"
    }
  }
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const ContentLayout = () => {
  const [dataDetails, setDataDetails] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGetDetails = async () => {
    const url = window.location.href
    setLoading(true)
    setDataDetails({})
    const res = await fetch(`https://api.mu-jie.cc/xhs?url=${url}`)
    const data = await res.json()
    if (data.code === 200) {
      let tempData = {
        ...data.data
      }
      message.success("获取成功")

      // 使用正则判断 data.data.title 是否包含 #
      const isExistence = data.data.title.indexOf("#") !== -1
      if (isExistence) {
        const splitContent = data.data.title.split("#")
        tempData.title = splitContent[0]
        tempData.tags = splitContent[1].split("#")
      }

      setDataDetails(tempData)
      setLoading(false)
      setIsModalOpen(true)
    } else {
      message.error(data.msg)
      setLoading(false)
    }
  }

  return (
    <ThemeAntd>
      {/* <StyleProvider
        container={document.getElementById("plasmo_btn").shadowRoot}>
        <Spin spinning={loading} fullscreen tip="去除水印中..." size="large" />
        <div className="watermark_btn" onClick={handleGetDetails}>
          去除水印
        </div>
      </StyleProvider>

      <Modal
        title="小红书去除水印工具"
        open={isModalOpen}
        footer={null}
        maskClosable
        width={600}
        onCancel={() => setIsModalOpen(false)}>
        <Details
          source="contents"
          loading={loading}
          dataDetails={dataDetails}
          children={undefined}
        />
      </Modal> */}
    </ThemeAntd>
  )
}

export default ContentLayout

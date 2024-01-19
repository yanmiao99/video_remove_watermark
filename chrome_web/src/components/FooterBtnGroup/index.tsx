import { DownloadOutlined, RightOutlined } from "@ant-design/icons"
import { App, Button, Image, List, Space, Tooltip } from "antd"

import "./index.less"

import useDebounce from "~hooks/useDebounce"

const settingList = [
  {
    title: "下载设置",
    description: "设置下载位置,下载保存路径,下载完成后是否显示内容",
    icon: <DownloadOutlined />
  }
]

const FooterBtnGroup = () => {
  const { modal } = App.useApp()

  // 跳转下载设置页面
  const handleGoDownSetting = () => {
    // 使用 chrome 的tab方法跳转到  chrome://settings/downloads
    chrome.tabs.create({
      url: "chrome://settings/downloads"
    })
  }

  const handleAbout = useDebounce((type) => {
    let typeObj = {
      author: {
        title: "关于作者",
        content: (
          <div className="about_author_modal">
            <div className="about_author_modal_item">
              <h3 className="about_author_modal_label">作者 : </h3>
              <div className="about_author_modal_value"> yanmiao </div>
            </div>
            <div className="about_author_modal_item">
              <h3 className="about_author_modal_label">邮箱 : </h3>
              <div className="about_author_modal_value"> 503084944@qq.com </div>
            </div>
            <div className="about_author_modal_item">
              <h3 className="about_author_modal_label">微信 : </h3>
              <div className="about_author_modal_value">
                <Image
                  src={require("~assets/images/info/weixin.png")}
                  className="about_author_modal_img"
                />
                <p>添加微信请注明来意~</p>
              </div>
            </div>
          </div>
        )
      },
      WeChat_public: {
        title: "关注公众号",
        content: (
          <div className="weixin_modal">
            <Image
              src="https://ai.woftsun.cn/qrcode.jpg"
              className="modal_img"
            />
            <div className="modal_title">扫码关注公众号</div>
          </div>
        )
      },
      setting: {
        title: "设置中心",
        content: (
          <div
            className="setting_wrapper"
            onClick={() => handleGoDownSetting()}>
            <List
              itemLayout="horizontal"
              dataSource={settingList}
              renderItem={(item, index) => (
                <Tooltip placement="top" title={item.description}>
                  <List.Item actions={[<RightOutlined />]}>
                    <List.Item.Meta avatar={item.icon} title={item.title} />
                  </List.Item>
                </Tooltip>
              )}
            />
          </div>
        )
      }
    }
    modal.warning({
      title: `${typeObj[type].title}`,
      content: typeObj[type].content,
      maskClosable: true,
      centered: true,
      icon: null,
      width: 300,
      okText: "关闭"
    })
  }, 250)

  return (
    <div className="footer_btn_group">
      <Button type="text" onClick={() => handleAbout("author")}>
        ♏ 关于
      </Button>
      <Button type="text" onClick={() => handleAbout("WeChat_public")}>
        🤔 公众号
      </Button>
      <Button type="text" onClick={() => handleAbout("setting")}>
        ⚙️ 设置
      </Button>
    </div>
  )
}

export default FooterBtnGroup

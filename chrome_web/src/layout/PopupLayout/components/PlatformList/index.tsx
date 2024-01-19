import "./index.less"

const supportList = [
  {
    testLink: "https://v.kuaishou.com/6nCeQQ",
    name: "快手",
    icon: require("~assets/images/kuaishou.png")
  },
  {
    testLink: "https://v.douyin.com/iLP3x3er",
    name: "抖音",
    icon: require("~assets/images/douyin.png")
  },
  {
    testLink: "https://www.xiaohongshu.com/explore/65a685bb000000002b00c752",
    name: "小红书",
    icon: require("~assets/images/xiaohongshu.png")
  },
  {
    testLink:
      "https://www.ixigua.com/7286052684975735336?logTag=26da11badc03c3bba27e",
    name: "西瓜视频",
    icon: require("~assets/images/xigua.png")
  },
  {
    testLink:
      "https://www.toutiao.com/video/7319485186943975975/?log_from=712a7ba0fcc6d_1705672322609",
    name: "头条视频",
    icon: require("~assets/images/toutiao.png")
  },
  {
    testLink: "https://h5.pipix.com/s/iLrs2khX/",
    name: "皮皮虾",
    icon: require("~assets/images/pipixia.png")
  }
]

const PlatformList = ({ formRef }) => {
  // 填充表单
  const handleFillForm = (url) => {
    formRef.setFieldsValue({
      url
    })
  }

  return (
    <>
      <p>支持平台列表如下: (可点击图标进行测试)</p>
      <div className="support_list">
        {supportList.map((item) => {
          return (
            <div
              key={item.name}
              className="support_item"
              onClick={() => handleFillForm(item.testLink)}>
              <img src={item.icon} alt={item.name} />
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PlatformList

import "./index.less"

import { useContext } from "react"

import { SettingContext } from "~context/settingContext"

const PlatformList = ({ formRef }) => {
  const settingContext = useContext<any>(SettingContext)

  // 填充表单
  const handleFillForm = (url) => {
    formRef.setFieldsValue({
      url
    })
  }

  return (
    <>
      {settingContext &&
        settingContext.platform &&
        settingContext.platform.length > 0 && (
          <>
            <p>支持平台列表如下: (可点击图标进行测试)</p>
            <div className="support_list">
              {settingContext.platform.map((item) => {
                return (
                  <div
                    key={item.name}
                    className="support_item"
                    onClick={() => handleFillForm(item.url)}>
                    <img src={item.icon} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </>
        )}
    </>
  )
}

export default PlatformList

import { App, ConfigProvider, theme } from "antd"
import zhCN from "antd/locale/zh_CN"
import type { ReactNode } from "react"
import { useEffect } from "react"

import { useGetSystemTheme } from "~hooks/useGetSystemTheme"
import AntdGlobal from "~utils/AntdGlobal"

import "./index.less"

const themeMap = {
  dark: {
    bgColor: "#2E3037",
    bgFn: theme.darkAlgorithm
  },
  light: {
    bgColor: "#FFFFFF",
    bgFn: theme.defaultAlgorithm
  }
}

export const ThemeAntd = ({ children = null as ReactNode }) => {
  const [systemTheme] = useGetSystemTheme()

  useEffect(() => {
    document.documentElement.style.background = themeMap[systemTheme].bgColor
  }, [systemTheme])

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: themeMap[systemTheme].bgFn,
        token: {
          // colorPrimary: "#ff2e4d"
          // colorPrimary: "#73d13d"
          // colorPrimary: "#61d275"
        }
      }}>
      <App>
        <AntdGlobal />
        {children}
      </App>
    </ConfigProvider>
  )
}

import { SettingProvider } from "~context/settingContext"
import PopupLayout from "~layout/PopupLayout"
import { ThemeAntd } from "~theme"

function IndexPopup() {
  return (
    <ThemeAntd>
      <SettingProvider>
        <PopupLayout />
      </SettingProvider>
    </ThemeAntd>
  )
}

export default IndexPopup

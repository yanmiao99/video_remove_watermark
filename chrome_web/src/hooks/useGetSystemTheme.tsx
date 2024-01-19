import { useEffect, useState } from "react"

export const useGetSystemTheme = () => {
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleMediaQueryChange = (e) => {
      setTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addListener(handleMediaQueryChange)
    setTheme(mediaQuery.matches ? "dark" : "light")

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  }, [])

  return [theme]
}

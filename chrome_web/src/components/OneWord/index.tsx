import "./index.less"

import React, { useEffect, useState } from "react"

const OneWord = () => {
  const [oneWord, setOneWord] = useState("")

  useEffect(() => {
    getOneWord()
  }, [])

  // 获取每日一言
  const getOneWord = async () => {
    const res = await fetch("https://v1.hitokoto.cn")
    const data = await res.json()
    data && setOneWord(data.hitokoto + " —— " + data.from)
  }

  return <div className="one_word">{oneWord}</div>
}

export default OneWord

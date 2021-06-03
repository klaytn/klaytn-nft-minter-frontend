import KlipAddress from "./KlipAddress"
import React from 'react'
import { Button } from "react-bootstrap"

export const KlipLoginBtn = () => {
  const [clicked, setClicked] = React.useState(false)

  const onClick = () => {
    setClicked(true)
  }

  if (clicked) {
    return (
      <>
        <p>아래의 QR 코드를 통해 클립에 로그인하세요.</p>
        <KlipAddress/>
      </>
    )
  }

  return (
    <Button onClick={onClick} color='primary'>Klip으로 로그인</Button>
  )
}
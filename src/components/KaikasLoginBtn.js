import React from 'react'
import { Button } from "react-bootstrap"
import { connect } from 'react-redux'
import {
  setKaikasAddressRoutine,
} from '../modules/kaikas'

const KaikasLoginBtn = (props) => {
  const [clicked, setClicked] = React.useState(false)
  const [notInstalled, setNotInstalled] = React.useState(false)
  const [kaikasAddress, setKaikasAddress] = React.useState('')

  const kaikasLogin = async () => {
    await window.klaytn.enable()

    const klaytnAddress = window.klaytn.selectedAddress
    setKaikasAddress(klaytnAddress)
    props.setKaikasAddressRoutineDispatcher({klaytnAddress})

    window.klaytn.on('accountsChanged', () => {
      const klaytnAddress = window.klaytn.selectedAddress
      console.log('account changed!', klaytnAddress)
      setKaikasAddress(klaytnAddress)
      props.setKaikasAddressRoutineDispatcher({klaytnAddress})
    })

    window.location.href="/home"

  }

  const onClick = () => {
    if(!window.klaytn) {
      setNotInstalled(true)
      return
    }
    setClicked(true)

    kaikasLogin()
  }

  if (kaikasAddress.length > 0) {
    return (<p>kaikas 주소: {kaikasAddress}</p>)
  }

  if (notInstalled) {
    return (
      <p>Kaikas가 설치되지 않았습니다. 이 <a href='https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi'>링크</a>를 통해 Kaikas를 설치할 수 있습니다.</p>
    )
  }

  if (clicked) {
    return (
      <p>Kaikas 창에서 로그인을 진행하세요.</p>
    )
  }

  return (
    <Button onClick={onClick} color='primary'>Kaikas로 로그인</Button>
  )
}

export default connect((state)=>({
  ...state,
  setKaikasAddressRoutine
}),{
  setKaikasAddressRoutineDispatcher: setKaikasAddressRoutine
})(KaikasLoginBtn)
import React from "react"
import Caver from 'caver-js'
import { NetworkUnsupportedModal } from "./NetworkUnsupportedModal";
import { OKModal } from "./OKModal";
import {connect} from 'react-redux';

const kaikasAdaptor = React.forwardRef((props, ref) => {
  const [showNetworkUnsupportedModal, setShowNetworkUnsupportedModal] = React.useState(false)
  const [showLoginInProgressModal, setShowLoginInprogressModal] = React.useState(false)
  const kaikasAddress = localStorage.getItem('kaikasAddress')

  const login = async() => {
    setShowLoginInprogressModal(true)
  }

  const onLogin = async () => {
    try {

      await window.klaytn.enable()
      const caver = new Caver(window.klaytn)

      const kaikasAddress = window.klaytn.selectedAddress
      if(!kaikasAddress) {
        localStorage.clear();
        console.log('kaikas address is not set.')
        window.location.reload()
      }

    } catch (err) {
      console.log('')
    }
  }

  async function init() {
    if(!window.klaytn)
      return

    window.klaytn.on('accountsChanged', async function(accounts) {
      if(kaikasAddress) {
        const klaytnAddress = window.klaytn.selectedAddress
        if( klaytnAddress !== undefined && kaikasAddress !== klaytnAddress ) {
          localStorage.clear()
          login()
        }
      }
    })

    window.klaytn.on('networkChanged', function() {
      const network = window.klaytn.networkVersion
      if(network !== parseInt(process.env.REACT_APP_CHAIN_ID))
        setShowNetworkUnsupportedModal(true)
      else 
        setShowNetworkUnsupportedModal(false)
    })

    if(kaikasAddress) {
      await window.klaytn.enable()

      const klaytnAddress = window.klaytn.selectedAddress
      if( klaytnAddress !== undefined && kaikasAddress !== klaytnAddress ) {
        login()
      }

      const network = window.klaytn.networkVersion
      if(network !== parseInt(process.env.REACT_APP_CHAIN_ID))
        setShowNetworkUnsupportedModal(true)
      else 
        setShowNetworkUnsupportedModal(false)
    }
  }

  React.useEffect(()=>{
    init()
  },[])

  return (
    <>
      {showNetworkUnsupportedModal && <NetworkUnsupportedModal show={true} />}
      {showLoginInProgressModal && <OKModal
        title='계정이 변경되었습니다.'
        body='새로운 계정의 정보를 불러오기 위해 Kaikas 서명이 필요합니다.'
        onClose={onLogin}
        show={true} 
      />}
    </>
  )
})

export const KaikasAdaptor = connect((state) => ({
  ...state,
}), {
})(kaikasAdaptor)
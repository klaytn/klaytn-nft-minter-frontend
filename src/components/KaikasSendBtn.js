import Caver from 'caver-js'
import React from 'react'
import { connect } from 'react-redux'
import { Button } from "react-bootstrap"
import {
  setKaikasAddressRoutine,
  kaikasSendTxRoutine,
} from '../modules/kaikas'

const KaikasSendBtn = (props) => {
  const [kaikasAddress, setKaikasAddress] = React.useState(localStorage.getItem('kaikasAddress'))
  React.useEffect(()=>{
    const value = props.kaikasReducer[props.setKaikasAddressRoutine.SUCCESS]
    if(value) {
      if(value.klaytnAddress) {
        setKaikasAddress(value.klaytnAddress)
      } else {
        setKaikasAddress('')
      }
    } 
  },[props.kaikasReducer[props.setKaikasAddressRoutine.SUCCESS]])

  React.useEffect(()=>{
    const value = props.kaikasReducer[props.kaikasSendTxRoutine.SUCCESS]
    if(value) {
      window.location.href='/home'
    }
  },[props.kaikasReducer[props.kaikasSendTxRoutine.SUCCESS]])

  const sendKaikas = async () => {
    const caver = new Caver(window.klaytn)
    const from = props.from
    const to = props.to
    const tokenId = props.tokenId
    const contractAddress = props.contractAddress

    const data = caver.klay.abi.encodeFunctionCall(
      {
        "constant": false,
        "inputs": [
          {
            "name": "from",
            "type": "address"
          },
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      [
        from,
        to,
        caver.utils
          .toBN(tokenId)
          .toString()
      ]
    )
    const txData = {
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from,
      to: contractAddress,
      gas: 1000000,
      data
    }

    const signed = await caver.klay.signTransaction(txData)
    props.kaikasSendTxRoutineDispatcher({rawTransaction:signed.rawTransaction})
  }

  return (
    <Button disabled={props.disabled} onClick={sendKaikas}>Kaikas로 보내기</Button>
  )

}

export default connect((state)=>({
  ...state,
  setKaikasAddressRoutine,
  kaikasSendTxRoutine,
}),{
  kaikasSendTxRoutineDispatcher:kaikasSendTxRoutine,
})(KaikasSendBtn)
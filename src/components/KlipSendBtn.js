import { getKlipAddressFetcherRoutine, getKlipAddressRoutine,
  klipSendRoutine,
  klipSendStatusCheckerRoutine,
 } from "../modules/klip"
import React from 'react';
import {connect} from 'react-redux';
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { isMobile } from "../modules/utils";
import LoadingOverlay from 'react-loading-overlay';

const KlipSendBtn = (props) => {
  const [requestKey, setRequestKey] = React.useState(undefined)
  const [isSigning, setIsSigning] = React.useState(false)

  const onSendClick = () => {
    props.klipSendRoutineDispatcher({contractAddr:props.contractAddr, tokenId:props.tokenId, from:props.from, to:props.to});
  }

  React.useEffect(()=>{
    const value = props.klipReducer[props.klipSendRoutine.SUCCESS];
    if( value && value.requestKey) {
      setRequestKey(value.requestKey);
    }
  },[props.klipReducer[props.klipSendRoutine.SUCCESS]])

  React.useEffect(()=>{
    const value = props.klipReducer[props.klipSendStatusCheckerRoutine.FULFILL];
    if( value && value.status === "requested" ) {
        setIsSigning(true)
    }
  },[props.klipReducer[props.klipSendStatusCheckerRoutine.FULFILL]])

  React.useEffect(()=>{
    const value = props.klipReducer[props.klipSendStatusCheckerRoutine.SUCCESS];
    if( value && value.status === "completed" ) {
      setIsSigning(false)
      window.location.href="/home"
    }
  },[props.klipReducer[props.klipSendStatusCheckerRoutine.SUCCESS]])

  if(requestKey) {
    if (isMobile.Android()) {
      window.open(`intent://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`)
      window.location.reload();
    }
    if (isMobile.IOS()) {
      window.open(`kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}`)
      window.location.reload();
    }
    return (
      <>
        아래 QR코드를 통해 클립에서 서명을 진행해주세요.<br/>
        <LoadingOverlay styles={{overlay:(base)=>({...base,width:'256px'})}} active={isSigning} spinner text="서명중입니다...">
          <QRCode value={`https://klipwallet.com/?target=/a2a?request_key=${requestKey}`} />
        </LoadingOverlay>
      </>
    )
  } else {
    return (
      <Button disabled={props.disabled} onClick={onSendClick}>Klip으로 보내기</Button>
    )
  }
}

export default connect((state)=>({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
  klipSendRoutine,
  klipSendStatusCheckerRoutine,
}),{
  getKlipAddressRoutineDispatcher: getKlipAddressRoutine,
  klipSendRoutineDispatcher: klipSendRoutine,
  klipSendStatusCheckerRoutineDispatcher: klipSendStatusCheckerRoutine,
})(KlipSendBtn)
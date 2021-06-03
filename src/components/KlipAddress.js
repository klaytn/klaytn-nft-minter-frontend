import { getKlipAddressFetcherRoutine, getKlipAddressRoutine } from "../modules/klip"
import React from 'react';
import {connect} from 'react-redux';
import { Button } from "react-bootstrap";
import QRCode from "react-qr-code";
import { isMobile } from "../modules/utils";

const KlipAddress = (props) => {
  const [klipAddr, setKlipAddress] = React.useState(undefined)
  const [requestKey, setRequestKey] = React.useState(undefined)

  const onBtnGetKlipAddr = () => {
  }

  React.useEffect(()=>{
    props.getKlipAddressRoutineDispatcher()
  },[])

  React.useEffect(() => {
    if (props.klipReducer[props.getKlipAddressRoutine.SUCCESS]) {
      setRequestKey(props.klipReducer[props.getKlipAddressRoutine.SUCCESS].requestKey)
    }
  },[[props.getKlipAddressRoutine.SUCCESS]])

  React.useEffect(()=>{
    if (props.klipReducer[props.getKlipAddressFetcherRoutine.SUCCESS]) {
      if(props.klipReducer[props.getKlipAddressFetcherRoutine.SUCCESS].klaytnAddress) {
        setRequestKey(undefined)
        setKlipAddress(props.klipReducer[props.getKlipAddressFetcherRoutine.SUCCESS].klaytnAddress)
      }
    }
  }
  ,[[props.getKlipAddressFetcherRoutine.SUCCESS]])

  if(requestKey) {
    if (isMobile.Android()) {
      return (<Button href={`intent://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`}>Klip 주소 얻어오기</Button>);
    }
    if (isMobile.IOS()) {
      return (<Button href={`kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}`}>Klip 주소 얻어오기</Button>);
    }
    return (
      <QRCode value={`https://klipwallet.com/?target=/a2a?request_key=${requestKey}`} />
    )
  } else if (klipAddr) {
    return (<a target="_blank" href={`${process.env.REACT_APP_SCOPE_URL}/account/${klipAddr}`}>{klipAddr}</a>);
  } else {
    return (
      <Button onClick={onBtnGetKlipAddr}>Klip 주소 얻어오기</Button>
    )
  }
}

export default connect((state)=>({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
}),{
  getKlipAddressRoutineDispatcher: getKlipAddressRoutine,
})(KlipAddress)
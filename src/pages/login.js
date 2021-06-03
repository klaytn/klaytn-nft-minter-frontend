import React from "react"
import { getKlipAddressFetcherRoutine, getKlipAddressRoutine, LOCAL_STORAGE_KEY_KLIP_ADDRESS } from "../modules/klip"
import {connect} from 'react-redux';
import { Col, Form, Row } from "react-bootstrap"
import { KlipLoginBtn } from "../components/KlipLoginBtn";
import KaikasLoginBtn from "../components/KaikasLoginBtn";

const Login = (props) => {
  const klipAddr = localStorage.getItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS)
  const kaikasAddress = localStorage.getItem('kaikasAddress')

  React.useEffect(()=>{
    if(klipAddr && klipAddr.length > 0) {
      window.location.href='/home'
    }
    if(kaikasAddress && kaikasAddress.length > 0) {
      window.location.href='/home'
    }
  }
  ,[])

  return (
    <>
      <Form>
        <Form.Group as={Row} controlId="formPlaintextPassword" className='mt-3'>
          <Col className='text-center'>
            <KlipLoginBtn />
          </Col>
          <Col className='text-center'>
            <KaikasLoginBtn />
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default connect((state)=>({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
}),{
})(Login)
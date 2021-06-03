import React from 'react'
import { getKlipAddressFetcherRoutine, getKlipAddressRoutine, LOCAL_STORAGE_KEY_KLIP_ADDRESS } from "../modules/klip"
import {connect} from 'react-redux';
import { kasNFTInfoRoutine } from "../modules/kas";
import { Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import ReactJson from 'react-json-view';
import KaikasSendBtn from '../components/KaikasSendBtn';
import KlipSendBtn from '../components/KlipSendBtn';
import {
  setKaikasAddressRoutine,
  kaikasLogoutRoutine,
} from '../modules/kaikas'

const NFTInfo = (props) => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  const [owner, setOwner] = React.useState('')
  const [rawJson, setRawJson] = React.useState('')
  const [recipient, setRecipient] = React.useState('')
  const [validRecipient, setValidRecipient] = React.useState(true)
  const klipAddr = localStorage.getItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS)
  const [kaikasAddress, setKaikasAddress] = React.useState(localStorage.getItem('kaikasAddress'))
  React.useEffect(()=>{
    const value = props.kaikasReducer[props.setKaikasAddressRoutine.SUCCESS]
    if(value) {
      if(value.klaytnAddress) {
        if(value.klaytnAddress != kaikasAddress) {
          setKaikasAddress(value.klaytnAddress)
          window.location.href='/home'
        }
      } else {
        setKaikasAddress('')
      }
    } 
  },[props.kaikasReducer[props.setKaikasAddressRoutine.SUCCESS]])

  React.useEffect(()=>{
    props.kasNFTInfoRoutineDispatcher({contractAddr:props.match.params.contractAddr, tokenId:props.match.params.id})
  },[])

  React.useEffect(()=>{
    if(props.kasReducer[props.kasNFTInfoRoutine.SUCCESS] && props.kasReducer[props.kasNFTInfoRoutine.SUCCESS].result) {
      var result = props.kasReducer[props.kasNFTInfoRoutine.SUCCESS].result

      setName(result.metadata.name)
      setDescription(result.metadata.description)
      setImageUrl(result.metadata.image)
      setOwner(result.owner)
      setRawJson(result.metadata)
    }
  },[[props.kasNFTInfoRoutine.SUCCESS]])

  const onChangeRecipient = (e) => {
    var addr = e.target.value
    var re = /0x[a-zA-Z0-9]{40,40}/
    setValidRecipient(re.test(addr))
    setRecipient(addr)
  }

  return (
    <Container className='mt-4'>
      <Row>
        <Col sm={4}>
          Image
        </Col>
        <Col sm={8}>
          <img style={{width:'100%'}} src={imageUrl} />
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          Contract Address
        </Col>
        <Col>
          {props.match.params.contractAddr}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          Owner
        </Col>
        <Col>
          {owner}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          Token ID
        </Col>
        <Col>
          {props.match.params.id}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          Name
        </Col>
        <Col>
          {name}
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
          Description
        </Col>
        <Col>
          {description}
        </Col>
      </Row>
      <Row className="my-2">
        <Col sm={4}>
          Raw JSON
        </Col>
        <Col>
          <ReactJson src={rawJson} enableClipboard={false} displayObjectSize={false} displayDataTypes={false} name={null} collapsed={true}/>
        </Col>
      </Row>
      {klipAddr && owner.toLowerCase() === klipAddr.toLowerCase() &&
        <Row className='my-2'>
          <Col>
              <InputGroup className="mb-3" hasValidation>
              <FormControl
                type='text'
                required isInvalid={!validRecipient}
                placeholder="Recipient's address"
                aria-describedby="basic-addon2"
                value={recipient}
                onChange={onChangeRecipient}
              />
              <InputGroup.Append>
                <KlipSendBtn disabled={!validRecipient} from={owner} to={recipient} tokenId={props.match.params.id} contractAddr={props.match.params.contractAddr} />
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                주소가 올바르지 않습니다.
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Row>
      }
      {kaikasAddress && owner.toLowerCase() === kaikasAddress.toLowerCase() &&
        <Row className='my-2'>
          <Col>
              <InputGroup className="mb-3" hasValidation>
              <FormControl
                type='text'
                required isInvalid={!validRecipient}
                placeholder="Recipient's address"
                aria-describedby="basic-addon2"
                value={recipient}
                onChange={onChangeRecipient}
              />
              <InputGroup.Append>
                <KaikasSendBtn disabled={!validRecipient} from={owner} to={recipient} tokenId={props.match.params.id} contractAddress={props.match.params.contractAddr} />
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                주소가 올바르지 않습니다.
              </Form.Control.Feedback>
            </InputGroup>
          </Col>
        </Row>
      }
    </Container>
  );
}

export default connect((state)=>({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
  kasNFTInfoRoutine,
  setKaikasAddressRoutine,
}),{
  kasNFTInfoRoutineDispatcher:kasNFTInfoRoutine
})(NFTInfo)
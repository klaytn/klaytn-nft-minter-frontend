import { Button, Col, Form, Row } from "react-bootstrap"
import {connect} from 'react-redux';
import React from 'react'
import reactCSS from 'reactcss'
import ImageUploader from 'react-images-upload';
import { ChromePicker } from 'react-color'
import axios from 'axios';
import { getKlipAddressFetcherRoutine, getKlipAddressRoutine, LOCAL_STORAGE_KEY_KLIP_ADDRESS } from "../modules/klip"
import {
  setKaikasAddressRoutine,
} from '../modules/kaikas'

const Mint = (props) => {
  const klipAddr = localStorage.getItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS)
  const [image, setImage] = React.useState(undefined)
  const [description, setDescription] = React.useState('')
  const [name, setName] = React.useState('')
  const [bgColor, setBgColor] = React.useState('#000000')
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false)
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


  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onBgColorChange = (color) => {
    setBgColor(color.hex)
  }

  const onBgColorClick = () => {
    setDisplayColorPicker(true)
  }

  const onBgColorClose = () => {
    setDisplayColorPicker(false)
  }

  const onImageChange = (im) => {
    setImage(im[0])
  }

  const formSubmit = () => {
    const formData = new FormData()

    var address = klipAddr
    if(!address ) {
      address = kaikasAddress
    }
    formData.append('name', name)
    formData.append('description', description)
    formData.append('background_color', bgColor)
    formData.append('image', image)
    formData.append('address', address)

    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/nft/mint`, formData).then(res => {
      window.location.href="/"
    }).catch(err => {
      alert('실패')
    })
  }

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `${bgColor}`
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
  <Form>
    <Form.Group as={Row} controlId="formImage">
      <Form.Label column sm="2">
        Image 
      </Form.Label>
      <Col sm="10">
      <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                singleImage={true}
                onChange={onImageChange}
                withPreview={true}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
            />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formName">
      <Form.Label column sm="2">
        Name
      </Form.Label>
      <Col sm="10">
        <Form.Control type="text" value={name} onChange={onNameChange}/>
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formDescription">
      <Form.Label column sm="2">
        Description
      </Form.Label>
      <Col sm="10">
        <Form.Control as="textarea" rows={3} value={description} onChange={onDescriptionChange} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} controlId="formBackgroundColor">
      <Form.Label column sm="2">
        BackgroundColor
      </Form.Label>
      <Col sm="10">
        <div style={ styles.swatch } onClick={ onBgColorClick }>
          <div style={ styles.color } />
        </div>
        { displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ onBgColorClose}/>
          <ChromePicker color={ bgColor } onChange={ onBgColorChange} />
        </div> : null }
      </Col>
    </Form.Group>

    <Button variant="primary" onClick={formSubmit}>
      Mint
    </Button>

  </Form>
  )
}

export default connect((state)=>({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
  setKaikasAddressRoutine,
}),{
})(Mint)
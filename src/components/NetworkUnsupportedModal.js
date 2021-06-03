import React from 'react'
import { Modal } from 'react-bootstrap';

export const NetworkUnsupportedModal = (props) => {
  const [show, setShow] = React.useState(props.show);
  const bodyText = process.env.REACT_APP_CHAIN_ID === '1001' ? 'Testnet' : 'Mainnet'

  const handleClose = () => {
    setShow(false)
    props.onClose && props.onClose()
  }

  return (
    <Modal show={show} centered backdrop='static' keyboard={false} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title style={{width:'100%'}} className='text-center'>
          네트워크 변경이 필요합니다.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        Kaikas를 열어 좌측 상단에 네트워크를 {bodyText}으로 변경해주세요.
      </Modal.Body>
    </Modal>
  )
}
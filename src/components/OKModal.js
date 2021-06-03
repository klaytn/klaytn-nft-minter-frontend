import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { MultilineText } from './MultilineText';

export const OKModal = (props) => {
  const [show, setShow] = React.useState(props.show || true);

  const handleClose = () => {
    setShow(false)
    props.onClose && props.onClose()
  }

  return (
    <Modal show={show} centered backdrop='static' keyboard={false} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title style={{width:'100%'}} className='text-center'>
          <MultilineText text={props.title} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        {props.body && props.body.length > 0 && <MultilineText text={props.body} />}
        {props.failMessage &&
          <>
            <br/>
            {props.failMessage.trim()}
          </>
        }
      </Modal.Body>
      <Modal.Footer style={{justifyContent:'center'}} className='text-center'>
        <Button style={{height:'60px', width:'320px'}} onClick={handleClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

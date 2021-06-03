import { Card } from "react-bootstrap"
import React from 'react';
import { getKlipAddressFetcherRoutine, getKlipAddressRoutine } from "../modules/klip"
import {connect} from 'react-redux';
import { kasGetMyNFTsRoutine } from "../modules/kas";
import ReactTimeAgo from 'react-time-ago'


const NFTCard = (props) => {
  const [imgUrl, setImgUrl] = React.useState('');
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(()=>{

    async function get() {
      setImgUrl(props.nft.image)
      setName(props.nft.name)
      setDescription(props.nft.description)
    }

    get()
  },[])

  if(props.nft.id == '') {
    return (
      <Card style={{border:0}}></Card>
    )
  }

  return (
    <Card>
      <Card.Img variant="top" className='m-4' style={{width:'auto'}} src={imgUrl} />
      <Card.Body>
        <Card.Text>{props.nft.id}</Card.Text>
        <Card.Title><a href={`/nft/${props.nft.contractAddress}/${props.nft.id}`}>{name}</a></Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated <ReactTimeAgo date={props.nft.updatedAt*1000}/></small>
      </Card.Footer>
    </Card>
  )
}

export default connect((state)=>({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
  kasGetMyNFTsRoutine,
}),{
  kasGetMyNFTsRoutineDispatcher:kasGetMyNFTsRoutine
})(NFTCard)
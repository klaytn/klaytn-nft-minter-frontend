import React from "react"
import {connect} from 'react-redux';
import { Container } from "react-bootstrap"
import { NFTGroup } from "../components/NFTGroup"
import { kasGetMyNFTsRoutine, kasGetMintedNFTsRoutine } from "../modules/kas";
import { getKlipAddressFetcherRoutine, getKlipAddressRoutine, LOCAL_STORAGE_KEY_KLIP_ADDRESS } from "../modules/klip"
import {
  setKaikasAddressRoutine,
} from '../modules/kaikas'

const Home = (props) => {
  const klipAddr = localStorage.getItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS)
  const [myNFTs, setMyNFTs] = React.useState([])
  const [mintedNFTs, setMintedNFTs] = React.useState([])

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
    var address = klipAddr
    if(!address ) {
      address = kaikasAddress
    }
    props.kasGetMyNFTsRoutineDispatcher({addr:address})
    props.kasGetMintedNFTsRoutineDispatcher({addr:address})
  },[])

  React.useEffect(()=>{
    if(props.kasReducer[props.kasGetMyNFTsRoutine.SUCCESS] && props.kasReducer[props.kasGetMyNFTsRoutine.SUCCESS].result) {
      setMyNFTs(props.kasReducer[props.kasGetMyNFTsRoutine.SUCCESS].result)
    }
  },[[props.kasGetMyNFTsRoutine.SUCCESS]])

  React.useEffect(()=>{
    if(props.kasReducer[props.kasGetMintedNFTsRoutine.SUCCESS] && props.kasReducer[props.kasGetMintedNFTsRoutine.SUCCESS].result) {
      setMintedNFTs(props.kasReducer[props.kasGetMintedNFTsRoutine.SUCCESS].result)
    }
  },[[props.kasGetMintedNFTsRoutine.SUCCESS]])

  return (
    <>
      <Container>
        <h2>내가 가진 NFT</h2>
        <NFTGroup nfts={myNFTs}/>

        <h2>내가 발행한 NFT</h2>
        <NFTGroup nfts={mintedNFTs}/>
      </Container>
    </>
  )
}

export default connect((state)=>({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
  kasGetMyNFTsRoutine,
  kasGetMintedNFTsRoutine,
  setKaikasAddressRoutine
}),{
  kasGetMyNFTsRoutineDispatcher:kasGetMyNFTsRoutine,
  kasGetMintedNFTsRoutineDispatcher:kasGetMintedNFTsRoutine,
  setKaikasAddressRoutineDispatcher: setKaikasAddressRoutine
})(Home)
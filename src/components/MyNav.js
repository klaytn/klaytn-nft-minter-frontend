import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import React from "react"
import { getKlipAddressFetcherRoutine, getKlipAddressRoutine, klipLogoutRoutine, 
  LOCAL_STORAGE_KEY_KLIP_ADDRESS } from "../modules/klip"
import {
  setKaikasAddressRoutine,
  kaikasLogoutRoutine,
} from '../modules/kaikas'
import {connect} from 'react-redux';
import { KaikasAdaptor } from "./KaikasAdaptor";

const MyNav = (props) => {
  const [klipAddr, setKlipAddress] = React.useState(localStorage.getItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS))
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
    if (props.klipReducer[props.getKlipAddressFetcherRoutine.SUCCESS]) {
      if(props.klipReducer[props.getKlipAddressFetcherRoutine.SUCCESS].klaytnAddress) {
        setKlipAddress(props.klipReducer[props.getKlipAddressFetcherRoutine.SUCCESS].klaytnAddress)
        window.location.href='/home'
      }
    }
  } ,[[props.getKlipAddressFetcherRoutine.SUCCESS]])

  const logout = () => {
    localStorage.clear();
    window.location.href="/login"
  }
  React.useEffect(()=>{
  },[])

  return (
    <Navbar collapseOnSelect expand='lg' bg="dark" variant="dark">
      <Navbar.Brand href="#">{process.env.REACT_APP_BAPP_NAME}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/mint">Mint</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {
            klipAddr ?
            <NavDropdown title={klipAddr} id="basic-nav-dropdown">
              <NavDropdown.Item href='#' onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            : kaikasAddress ? 
            <NavDropdown title={kaikasAddress} id="basic-nav-dropdown">
              <NavDropdown.Item href='#' onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            : <Nav.Link href='/login'>Login</Nav.Link>
          }
        </Nav>
      </Navbar.Collapse>
      <KaikasAdaptor/>
    </Navbar>
  )
}
export default connect((state) => ({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
  setKaikasAddressRoutine,
}), {
  klipLogoutRoutineDispatcher:klipLogoutRoutine,
  setKaikasAddressRoutineDispatcher: setKaikasAddressRoutine,
  kaikasLogoutRoutineDispatcher:kaikasLogoutRoutine,
})(MyNav)
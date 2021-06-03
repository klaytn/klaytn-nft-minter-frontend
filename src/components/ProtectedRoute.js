import React from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { getKlipAddressFetcherRoutine, getKlipAddressRoutine, klipLogoutRoutine, LOCAL_STORAGE_KEY_KLIP_ADDRESS } from "../modules/klip"

const ProtectedRoute = (props) => {
    const {component: Component, ...rest} = props; 
    const loginPath = {
      pathname:`/login`,
      search:`?origin=${encodeURIComponent(props.location.pathname+props.location.search)}`,
    }
    const klipAddr = localStorage.getItem(LOCAL_STORAGE_KEY_KLIP_ADDRESS)
    const kaikasAddress = localStorage.getItem('kaikasAddress')
    var allowed = false

    if(klipAddr && klipAddr.length > 0 ) {
      allowed = true
    }

    if(kaikasAddress && kaikasAddress.length > 0 ) {
      allowed = true
    }
    
    return (
      <Route {...rest} render={(props)=>(
        allowed ?
        <Component {...props} />
        : <Redirect to={loginPath}  />
      )} />
    );
}

export default connect((state) => ({
  ...state,
  getKlipAddressRoutine,
  getKlipAddressFetcherRoutine,
}), {
  klipLogoutRoutineDispatcher:klipLogoutRoutine
})(ProtectedRoute)
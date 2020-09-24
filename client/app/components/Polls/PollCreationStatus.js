import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Polls from './Polls';

const Status = ({status})=>{

  if(status=='success')return (
  
  
    <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>Success!</strong> Head over to home to find your poll.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  
  )
  else if(status =='failed') return (
  
  
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>Failed!</strong> The poll you are creating already exists
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
  
  )
  else return <></>

  
}

export default Status
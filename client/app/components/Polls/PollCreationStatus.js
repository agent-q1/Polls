import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Polls from './Polls';

const Status = ({status})=>{

  if(status=='success')return <p>Success</p>
  else if(status =='failed') return <p>Unable to create poll</p>
  else return <></>

  
}

export default Status
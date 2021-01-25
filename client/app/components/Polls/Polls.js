import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Options from './Options';


const Polls = ({auth})=>{

    const [Polls,setPolls] = useState([]);


    const findPolls=()=>{
        if(auth){
          fetch('/api/Polls')
            .then(res =>{
              return res.json()
            })
            .then(json => {
              

              setPolls(json)

            })
        }
      }

      
    useMemo(()=>{
        findPolls();
    },[])



    
      

    return (
      <div class="row row-cols-1 row-cols-md-2">
            
                {Polls.map((poll, i) => (
                
                        <Options pollName={poll.name} options={poll.options} id={poll._id} votable={poll.votable} />
                   
                )) }
            
        </div>
    );
}

export default Polls

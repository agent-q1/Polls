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
        <>
            <ul>
                {Polls.map((poll, i) => (
                <li key={i}>
                    <p>{poll.name}</p>
                    <ol>
                        <Options options={poll.options} id={poll._id} votable={poll.votable} />
                    </ol>
                </li>
                )) }
            </ul>
        </>
    );
}

export default Polls

import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Options from './Options';


const Polls = ({auth})=>{

    const [Polls,setPolls] = useState([]);
    const [name,setName] = useState('');


    const findPolls=()=>{
        if(auth){
          fetch('/api/Polls')
            .then(res =>{
              return res.json()
            })
            .then(json => {
              console.log(json)
              setPolls(json)

            })
        }
      }

      
    useMemo(()=>{
        findPolls();
    },[])



    const newPoll=(e)=>{
        fetch(`/api/Polls/checkduplication`, {method: 'POST',headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({name:name})})
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if(json.length==0){
            const data = {name: name};
            console.log(data);
        fetch('/api/Polls/add', { method: 'POST', body: JSON.stringify(data) ,   headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }})
          .then(res => res.json())
          .then(_json => {
            setPolls(Polls=>[...Polls,_json])
          });
    
          }
          else{
            let index;
    
            for(let i = 0;i< Polls.length ; i++){
              if(Polls[i].id == json[0].id){
                index = i;
              }
            }
            console.log("index is")
            console.log(index)
            console.log(json[0])
    
            
          }
        });
        
        
      }
      

    return (
        <>
            <ul>
                {Polls.map((poll, i) => (
                <li key={i}>
                    <p>{poll.name}</p>
                    <ol>
                        <Options options={poll.options} id={poll._id} />
                    </ol>

                    {/* <button onClick={() => this.decrementCounter(i)}>-</button>
                    <button onClick={() => this.deleteCounter(i)}>x</button> */}
                </li>
                )) }
            </ul>
        </>
    );
}

export default Polls

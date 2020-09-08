import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';

const Options = ({options,id})=>{

    const [Options,setOptions] = useState([]);
    const [name,setName] = useState('');

    useMemo(()=>{
        // console.log(options)
        setOptions(options)
    },[])




      




    const newOption=(e)=>{
        fetch(`/api/Polls/checkduplicationopt`, {method: 'POST',headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({qid:id,name:name})})
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if(json.length==0){
            const data = {name: name,qid:id};
            console.log(data);
        fetch('/api/Polls/addOption', { method: 'POST', body: JSON.stringify(data) ,   headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }})
          .then(res => res.json())
          .then(_json => {
            setOptions(Options=>[...Options,_json])
          });
    
          }
          else{
            let index;
    
            for(let i = 0;i< Options.length ; i++){
              if(Options[i].id == json[0].id){
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
            {Options.map((option,i)=>(
                <li key={i}>
                    <p>{option.name}</p>
                    {/* <button onClick={newPoll}>New Voting Poll Topic</button> */}
                </li>
            ))}
            <input type = 'text' onChange={(e)=>setName(e.target.value)} />
            <button onClick={newOption}>Add Option</button>
        </>
    );
}

export default Options

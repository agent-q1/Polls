import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Polls from './Polls';

const Options = ({options,id,votable})=>{

    const [Options,setOptions] = useState([]);
    const [name,setName] = useState('');
    const [Votable, setVotable] = useState('');
    

    useMemo(()=>{
        // console.log(options)
        setOptions(options)
        if(votable){
          setVotable('yes')
        }
        
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

      const vote=(index)=>{
        const optid = Options[index]._id;
    
        fetch(`/api/Polls/increment`, { method: 'PUT',headers: {
          'Content-Type': 'application/json'}, body: JSON.stringify({qid:id,optid:optid})})
          .then(res => {
            console.log(res)
            return res.json();
            
          })
          .then(json => {
            setOptions(json.options)     
            setVotable(json.votable)       
          });
      }

      let voteButton

      if(votable){
        voteButton = <button onClick={()=> vote(i)}>Vote</button>

      }
      else {
        voteButton = <></>
      }

      
    return (
        <>
            
            {Options.map((option,i)=>(
                <li key={i}>
                
                    <p>{option.name}</p>
                    <p>{option.count}</p>
                    
                    <button disabled={Votable=='yes' ? false : true} onClick={()=> vote(i)}>Vote</button>
                   
                   
                </li>
            ))}
        </>
    );
}

export default Options

import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Polls from './Polls';

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

      const vote=(index)=>{
        const optid = Options[index]._id;
    
        fetch(`/api/Polls/increment`, { method: 'PUT',headers: {
          'Content-Type': 'application/json'}, body: JSON.stringify({qid:id,optid:optid})})
          .then(res => res.json())
          .then(json => {
            setOptions(json.options)            
          });
      }

      // const decrementCounter=(index)=>{
      //   const optid = Options[index]._id;
    
      //   fetch(`/api/Polls/decrement`, { method: 'PUT',headers: {
      //     'Content-Type': 'application/json'}, body: JSON.stringify({qid:id,optid:optid})})
      //     .then(res => res.json())
      //     .then(json => {
      //       setOptions(json.options)            
      //     });
      // }
    
      // const decrementCounter=(index)=>{
      //   const id = this.state.counters[index]._id;
    
      //   fetch(`/api/counters/${id}/decrement`, { method: 'PUT' })
      //     .then(res => res.json())
      //     .then(json => {
      //       this._modifyCounter(index, json);
      //     });
      // }
      
    return (
        <>
            
            {Options.map((option,i)=>(
                <li key={i}>
                
                    <p>{option.name}</p>
                    <p>{option.count}</p>
                    
                    <button onClick={()=> vote(i)}>Vote</button>
                   
                   
                </li>
            ))}
        </>
    );
}

export default Options

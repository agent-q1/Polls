
import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Options from './Options';
import Status from './PollCreationStatus'



const CreatePoll = ({auth})=>{

    const [name,setName] = useState('');
    const [options, setOptions] = useState([]);
    const [status,setStatus] = useState('');
    const [pollName, setPollName] = useState('');

    const newOption = (e)=>{
        let alreadyExists = false;
        for(let i = 0;i<options.length; i++){
            if(options[i].name==name){
                alreadyExists = true;
            }

        }

        setName('');
        if(!alreadyExists && name!=''){
            const tempNewOption = {
                name: name,
    
            }
            
    
            setOptions(options=>[...options,tempNewOption])

        }
        
        console.log(options)
    }   




    const newPoll=(e)=>{
        fetch(`/api/Polls/checkduplication`, {method: 'POST',headers: {
            'Content-Type': 'application/json'}, body: JSON.stringify({name:pollName})})
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if(json.length==0){
            setPollName('');
            setOptions([]);
            const data = {name: pollName, options: options};
            console.log(data);
        fetch('/api/Polls/add', { method: 'POST', body: JSON.stringify(data) ,   headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }})
          .then(res => res.json())
          .then(_json => {
            setStatus('success')
          });
    
          }
          else{
            setStatus('failed')
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
           
            <Status status={status}/>
            <div>

            <p>Enter name of Poll</p>

            <input type = 'text' onChange={(e)=>setPollName(e.target.value)} value={pollName}  />            
            
            <ul>
            {options.map((option, i)=>(
                <li key={i}>
                
                
                    <p>{option.name}</p>

                    </li>
                    
                   
                   
                
            ))}

            </ul>
           

            </div>

            <div>
            <p>Enter option</p>
            <input type = 'text' onChange={(e)=>setName(e.target.value)} value={name} />
            </div>
            <div> <button onClick={newOption}>Add Option</button></div>

            <div>
            <button onClick={newPoll}>Create Poll</button></div>
        
           
        
        </>
    );
}

export default CreatePoll;

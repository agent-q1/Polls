
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

            <div class = "container">

            <div >
            <div>

            <div class="form-group col-4">
             <p>Enter name of Poll</p>
             <input class="form-control" type = 'text' onChange={(e)=>setPollName(e.target.value)} />   
             
             </div>

            

                     
            <div class="col-6">
            <ul class = "list-group list-group ">
            {options.map((option, i)=>(
              <li class="list-group-item d-flex justify-content-between align-items-center" key={i}>
                   
                
                <div class="form-group ">
                    <p>{option.name}</p>
                    </div>
                

                    </li>
                    
                   
                   
                
            ))}

            </ul>
            </div>
           

            </div>

            <div class="form-group col-4">
            <p>Enter option</p>
            <input class="form-control" type = 'text' onChange={(e)=>setName(e.target.value)} />
            
            <div> <button class = "btn btn-dark" onClick={newOption}>Add Option</button></div>

            </div>

            </div>
            

            <div>
            <button class = "btn btn-dark" onClick={newPoll}>Create Poll</button></div>
            </div>
        
           
        
        </>
    );
}

export default CreatePoll;

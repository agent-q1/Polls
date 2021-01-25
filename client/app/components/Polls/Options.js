import React, { useState, useEffect, useMemo } from 'react';
import 'whatwg-fetch';
import Polls from './Polls';

const Options = ({pollName, options,id,votable})=>{

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
        // <div class="container">

        //   <ul class = "list-group list-group-horizontal" >
            
        //     {Options.map((option,i)=>(
        //         <li class="list-group-item d-flex justify-content-between align-items-center" key={i}>
                
        //             <p>{option.name}</p>
        //             <span class="badge badge-primary badge-pill">{option.count}</span>
                    
        //             <button class="btn btn-light" disabled={Votable=='yes' ? false : true} onClick={()=> vote(i)}>Vote</button>
                   
                   
        //         </li>
        //     ))}
        //     </ul>
        // </div>

        <div class="col mb-4">
           <div class="card">
       
                <div class="card-body">
                    <h5 class="card-title">{pollName}</h5>
                    <p class="card-text">Poll Description and creator go here</p>
                    <ul class = "list-group list-group" >
            
                     {Options.map((option,i)=>(
                      <li class="list-group-item d-flex justify-content-between align-items-center" key={i}>
                       <div> <p>{option.name}</p>

                       <button class="btn btn-light" disabled={Votable=='yes' ? false : true} onClick={()=> vote(i)}>Vote</button>
                       </div> 

                       <span class="badge badge-primary badge-pill">{option.count}</span>
                      
                    
                       
                   
                   
                       </li>
                 ))}
            </ul>
                    
                </div>
           </div>
        </div>
    );
}

export default Options

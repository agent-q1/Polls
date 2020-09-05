import React, { Component } from 'react';
import 'whatwg-fetch';
import SignIn from '../SignIn/SignIn'
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      name: "voting",
      auth : false,
      loaded:false
    };
    this.newCounter = this.newCounter.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
    this.decrementCounter = this.decrementCounter.bind(this);
    this.deleteCounter = this.deleteCounter.bind(this);
    this.updateAuth = this.updateAuth;
    this._modifyCounter = this._modifyCounter.bind(this);
    // this.logout = this.logout(this);

    
  }
  updateAuth = (text) => {this.setState({auth:true});this.findcounter()};

  findcounter(){
    if(this.state.auth){
      fetch('/api/counters')
        .then(res =>{
          return res.json()
        })
        .then(json => {
          console.log(json)
          this.setState({
            counters: json,
          });
        })
    }
  }

  componentDidMount(){
    if(!this.state.loaded){
        fetch(`/SignIn/auth`, {method: 'GET'})
          .then((res)=>{
              // console.log('aa')
              this.setState({
                loaded:true
              })
              if(res.status===200){
                this.setState({
                  auth:true
                })
                this.findcounter();
              }else{
                this.setState({
                  auth:false
                })
              }

          })
    }
  }
  

  newCounter() {
    fetch(`/api/counters/${this.state.name}`, {method: 'GET'})
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if(json.length==0){
        const data = {name: this.state.name};
    console.log(data);
    fetch('/api/counters', { method: 'POST', body: JSON.stringify(data) ,   headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }})
      .then(res => res.json())
      .then(_json => {
        let data = this.state.counters;
        data.push(_json);

        this.setState({
          counters: data
        });
      });

      }
      else{
        let index;

        for(let i = 0;i< this.state.counters.length ; i++){
          if(this.state.counters[i].id == json[0].id){
            index = i;
          }
        }
        console.log("index is")
        console.log(index)
        console.log(json[0])

        fetch(`/api/counters/${json[0]._id}/increment`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
        
      }
    });
    
    
  }

  incrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/increment`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  decrementCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}/decrement`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        this._modifyCounter(index, json);
      });
  }

  deleteCounter(index) {
    const id = this.state.counters[index]._id;

    fetch(`/api/counters/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifyCounter(index, null);
      });
  }

  myChangeHandler = (event) => {
    this.setState({name: event.target.value});
  
  }

  _modifyCounter(index, data) {
    let prevData = this.state.counters;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      counters: prevData
    });
  }

  logout=()=>{
    fetch(`/SignIn/Logout`,{ method: 'GET' })
      .then((res)=>{
        if(res.status === 200){
          this.setState({
            auth:false
          })
        }
      })
  }

  render() {
    return (
      (!this.state.loaded)?<h1>Loading...</h1>:(
        (!this.state.auth)?<SignIn update={this.updateAuth} />:
        <>
          <p>Voting Categories:</p>
          <h4 onClick={this.logout} >Logout</h4>

          <ul>
            { this.state.counters.map((counter, i) => (
              <li key={i}>
                <p>{counter.name} </p>
                <p>{counter.count}</p>
                <button onClick={() => this.incrementCounter(i)}>+</button>
                <button onClick={() => this.decrementCounter(i)}>-</button>
                <button onClick={() => this.deleteCounter(i)}>x</button>
              </li>
            )) }
          </ul>

          <input type = 'text' onChange={this.myChangeHandler} />
          <button onClick={this.newCounter}>New Voting Category</button>
          
          
        </>
      )
    );
  }
}

export default Home;

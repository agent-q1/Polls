import React, { Component } from 'react';
import 'whatwg-fetch';
import SignIn from '../SignIn/SignIn'
import Polls from '../Polls/Polls'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: [],
      name: "voting",
      auth : false,
      loaded:false
    };
    this.updateAuth = this.updateAuth;
    // this.logout = this.logout(this);

    
  }
  updateAuth = (text) => {this.setState({auth:true});};

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

  componentDidMount(){

    if(!this.state.loaded){
        fetch(`/SignIn/auth`, {method: 'GET'})
          .then((res)=>{
              // console.log('aa')
              this.setState({
                loaded:true
              })
              if(res.status===200){
                console.log('validated')
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
  

    


  render() {
    return (
      (!this.state.loaded)?<><div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div></>:(
        (!this.state.auth)?<SignIn update={this.updateAuth} />:
        <>
          <p>Voting Categories:</p>
          <button onClick={this.logout} class = "btn btn-dark">Logout</button>

      

          <Polls auth={this.state.auth} />
          
          
        </>
      )
    );
  }
}

export default Home;

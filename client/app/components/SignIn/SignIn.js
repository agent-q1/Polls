import React,{useState} from 'react';

const SignIn = ({update})=>{

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const signin = (e)=>{
        e.preventDefault();
        fetch('/SignIn',{method:'POST',headers: { 'Content-Type': 'application/json' },body: JSON.stringify({username:username,password:password})})
            .then((res)=>{
                if(res.status === 200){
                    update()
                }
            })
    }
    return (
        <div class = "container">
         <div class = "row">
            <div class = "col-6">
            <div class = "col-sm-8">
                <h1>SignIn</h1>
                <form onSubmit={signin}>
                    <div class = "form-group">
                    <label for="Username">Username: </label>
                        <input type="username" class="form-control" name="username" aria-describedby="emailHelp" value={username} onChange={e => setUsername(e.target.value)}/>
                        <small id="emailHelp" class="form-text text-muted">Usernames are case-sensitive</small>
                    </div>
                    <div class = "form-group">
                    <label for="Password">Password: </label>
                        <input name="password" class="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button class = "btn btn-dark">SignIn</button>
                </form>
                </div>
            </div>
            <div class = "col-6">
                <div class = "col-sm-8">
                <h1>SignUp</h1>
                <form method='POST' action="/SignUp" >
                    <div class = "form-group">
                    <label for="Username">Username: </label>
                        <input  class="form-control" aria-describedby="emailHelp" name="username"  />
                        <small id="emailHelp" class="form-text text-muted">Usernames are case-sensitive</small>
                    </div>
                    <div class = "form-group">
                    <label for="Password">Password: </label>
                        <input name="password" class="form-control" type="password" />
                    </div>
                    <button class = "btn btn-dark">SignUp</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SignIn
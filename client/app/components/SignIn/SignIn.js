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
        <div>
            <div>
                <h1>SignIn</h1>
                <form onSubmit={signin}>
                    <div>
                        <span>username:</span>
                        <input name="username"  value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <span>Password:</span>
                        <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button>SignIn</button>
                </form>
            </div>
            <div>
                <h1>SignUp</h1>
                <form method='POST' action="/SignUp" >
                    <div>
                        <span>username:</span>
                        <input name="username"  />
                    </div>
                    <div>
                        <span>Password:</span>
                        <input name="password" type="password" />
                    </div>
                    <button>SignIn</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn
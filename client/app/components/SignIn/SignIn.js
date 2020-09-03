import React from 'react';

const SignIn = ()=>{


    return (
        <form method='POST' action="/SignIn" >
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
    )
}

export default SignIn
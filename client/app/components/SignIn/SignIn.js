import React from 'react';

const SignIn = ()=>{


    return (
        <div>
            <div>
                <h1>SignIn</h1>
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
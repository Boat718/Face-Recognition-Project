
import React from 'react';

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }


    onEmailChange = (event)=>{
        this.setState({signInEmail:event.target.value})
    }

    onPasswordChange = (event)=>{
        this.setState({signInPassword:event.target.value})
    }

    onSubmitSignIn = ()=>{
        fetch('https://facerecognition-backend-1.herokuapp.com/signin',{
            method:'post',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(res=>res.json())
        .then(user=>{
            if (user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else{

                alert(JSON.stringify(user))
            }
        })
    }

    render(){
        const {onRouteChange} = this.props;;
        return(
        <article className="br5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw5 f4 ma1" htmlFor="email-address">Email</label>
                            <input onChange={this.onEmailChange} style={{"lineHeight": 'normal'}} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label  className="db fw5  f4 ma1" htmlFor="password">Password</label>
                            <input onChange={this.onPasswordChange} style={{"lineHeight": 'normal'}} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" type="password" name="password"  id="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className=" f5 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn} />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={()=>onRouteChange('register')} className="f3 link dim black db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
        )
    }
}

export default Signin;

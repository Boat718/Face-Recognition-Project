import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            name:''
        }
    }


    onnameChange = (event)=>{
        this.setState({name:event.target.value})
    }

    onEmailChange = (event)=>{
        this.setState({email:event.target.value})
    }

    onPasswordChange = (event)=>{
        this.setState({password:event.target.value})
    }

    onSubmitSignIn = ()=>{
        fetch('https://facerecognition-backend-1.herokuapp.com/register',{
            method:'post',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({
                email:this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        }).then(res=>res.json())
        .then(user=>{
            if (user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('signin');
            }
        })
    }


    render(){

        return(
        <article className="br5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw5 f4 ma1" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" style={{"lineHeight": 'normal'}} type="text" name="name"  id="name" onChange={this.onnameChange} />
                        </div>
                        <div className="mt3">
                            <label className="db fw5 f4 ma1" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" style={{"lineHeight": 'normal'}} type="email" name="email-address"  id="email-address" onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw5 f4 ma1" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 f5" style={{"lineHeight": 'normal'}} type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className=" f3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib" type="submit" value="Register " onClick={this.onSubmitSignIn}/>
                    </div>
                </div>
            </main>
        </article>
        )

    }
        
    
}

export default Register;

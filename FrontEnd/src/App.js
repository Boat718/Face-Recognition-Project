import React, { Component } from 'react'
import './App.css'
import Navigation from './Components/Navigation/Navigation';
import 'tachyons'
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particless from './Components/Particles/Particless';


const initialState = {
  input:'',
  imageUrl:'',
  box:[],
  outputValue:'',
  modelName:'',
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    password:'',
    entries:0,
    joined: ''
  }
};

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  //data.outputs[0].model.name
  //data.outputs[0].data.regions[0].region_info.value  NUm

  loadUser =(data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        entries:data.entries,
        joined: data.joined
    }})
  }
  
  calculateFaceLocation=(data)=>{
    
    const All = data.outputs[0].data.regions;
    return All.map((element)=>{
      let values = Number(element.data.concepts[0].value);
      let model_name = element.data.concepts[0].name;
      let clarifaiFace = element.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return{
        leftCol: clarifaiFace.left_col*width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col*width),
        bottomRow: height - (clarifaiFace.bottom_row*height),
        values:values,
        model_name:model_name
      }
    })
    
    // const values = Number(data.outputs[0].data.regions[0].value);
    // const model_name = data.outputs[0].model.name;
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // const image = document.getElementById('inputimage');
    // const width = Number(image.width);
    // const height = Number(image.height);
    // return{
    //   leftCol: clarifaiFace.left_col*width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col*width),
    //   bottomRow: height - (clarifaiFace.bottom_row*height),
    //   values:values,
    //   model_name:model_name
    // }
  }

  displayFaceBoxx = (box)=>{
  this.setState({box: box})
    console.log(box)
  }

  OnInputChange = (event)=>{
    this.setState({input:event.target.value});
    
  }
    

  OnPictureSubmit = ()=>{
    this.setState({imageUrl:this.state.input});
    console.log(this.state.input);
    fetch('https://facerecognition-backend-1.herokuapp.com/imageurl',{
      method:'post',
      headers:{'content-Type':'application/json'},
      body:JSON.stringify({
        input:this.state.input
      })
    })
    .then(res=>res.json())
    .then(response=> {
      console.log(response);
      if(response){
        fetch('https://facerecognition-backend-1.herokuapp.com/image',{
            method:'put',
            headers:{'content-Type':'application/json'},
            body:JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(res=>res.json()).then(count=>{
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
        .catch(console.log)
        
      }
      this.displayFaceBoxx(this.calculateFaceLocation(response))
      
    })
    .catch(err=>console.log(err));
  }

  onRouteChange = (route)=>{
    if (route === 'signout'){
      this.setState(initialState);
    }else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render(){
    console.log(this.state.imageUrl);
    // const {isSignedIn,imageUrl,box,route } = this.state;
    return (
      <div className="App">
         <Particless/>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
        {
          this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm inputChange = {this.OnInputChange} buttonSubmit = {this.OnPictureSubmit}/>
            <FaceRecognition imgUrl = {this.state.imageUrl} box={this.state.box}/>
          </div>
        :(
          (this.state.route === 'signin' || this.state.route === 'signout' )? 
          <Signin  loadUser={this.loadUser} onRouteChange = {this.onRouteChange} /> 
          :<Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
        )
        }

      </div>
    );
  }
}

export default App;

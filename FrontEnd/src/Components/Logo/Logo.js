import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './logo.css'


const Logo = ()=>{
    return(
        <div className='ma4 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 170, width: 170 }} >
            <div className="Tilt-inner" > <img alt = 'logo' src={brain} width='120' height='auto' style={{paddingTop:'17px'}} /> 
            </div>
        </Tilt>
        </div>
    )
}

export default Logo;
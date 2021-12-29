import React from 'react'
import './faceFrame.css'

const FaceRecognition = ({imgUrl,box})=>{
    
    console.log(box)
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
            <img id="inputimage" alt= '' src={imgUrl} width='500px' height='auto'/>

            {box.map((element,index)=>{
               return(  
                <div key={index} className='bounding-box' style={{top:element.topRow, bottom:element.bottomRow, left:element.leftCol, right:element.rightCol}}>
                    <div className={(imgUrl.length > 1)? 'face':''}>
                        <span>{element.model_name}</span>
                        <span className={(imgUrl.length > 1)? 'value':''}>{(element.values).toPrecision(3)}</span>
                    </div>
                </div> 
                ) 
            })}
            
            </div>
            
            
        </div>

    )
}

export default FaceRecognition;
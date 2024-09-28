import React from 'react'
import loaderAnimation from '../assets/smartway_loader.json'
import {Player} from "@lottiefiles/react-lottie-player"
const Loader = ({showLoader}) => {
    if(showLoader){
        return (
            <div
            style={{
                zIndex:999,
                position:"fixed",
                top:0,
                width:'100%',
                background:"#00000099",
                left:0,
                bottom:0
            }}
            className='flex justify-center items-center'
            ><Player
            autoplay
            loop
            src={loaderAnimation}
            style={{height:'300px' , width:'300px'}}
            className="flex justify-center items-center"
            />
            {}</div>
          )
    }

}

export default Loader
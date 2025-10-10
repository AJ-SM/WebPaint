
"use client"
import React, { useEffect, useRef, useState } from "react"


export default function Board(){
    const canvaref = useRef<HTMLCanvasElement>(null)
    const isPainting = useRef<boolean>(false)
    const pointer = useRef({x:0,y:0})
    function updatepointer(e:MouseEvent){
        pointer.current = {x:e.clientX,y:e.clientY}
    }


    useEffect(()=>{
        window.addEventListener('mousemove',(e)=>updatepointer(e))
        const canva = canvaref.current
        if(!canva) return;

        const ctx = canva.getContext('2d');
        if(!ctx) return;
    
        
      function startPostion(){
          isPainting.current=true
          
        }
            function EndPostion(){
            isPainting.current = !isPainting.current
            ctx?.beginPath()
            }

            const draw = ()=>{
            // ctx.fillStyle = "black";
            // ctx.fillRect(0, 0, canva.width, canva.height);


            // Next Code here 

            // Line Here 
function line() {
  

    if(isPainting.current){
    if(!ctx) return;
    ctx.lineWidth=10;
    ctx.lineCap='round'
    ctx.lineTo(pointer.current.x,pointer.current.y)
    ctx.strokeStyle = "white"
    ctx.stroke()
  }

  
}
            line();

            requestAnimationFrame(draw)
            }


        const resize = ()=>{
            canva.height = window.innerHeight
            canva.width = window.innerWidth

        }
        resize();
        draw();
        
        window.addEventListener('resize',resize);
        window.addEventListener("mousedown", startPostion);
        window.addEventListener("mouseup", EndPostion);
        
        return ()=>{ 
            window.removeEventListener('resize',resize);
            window.removeEventListener('mousemove',updatepointer); 
            window.removeEventListener("mousedown", startPostion);
            window.removeEventListener("mouseup", EndPostion);
        }
        
        


    },[])
        

    


    return (
        <canvas ref={canvaref} className="flex justify-center items-center h-screen w-screen bg-black"/>
    )

}
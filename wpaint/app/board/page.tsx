
"use client"
import React, { useEffect, useRef, useState } from "react"


export default function Board(){
    const canvaref = useRef<HTMLCanvasElement>(null)
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

            const draw = ()=>{
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canva.width, canva.height);

            ctx.beginPath();
            ctx.arc(pointer.current.x , pointer.current.y,6, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            requestAnimationFrame(draw)
            }


        const resize = ()=>{
            canva.height = window.innerHeight
            canva.width = window.innerWidth

        }
        resize();
        draw();
        
        window.addEventListener('resize',resize);
        
        
        return ()=>{ 
            window.removeEventListener('resize',resize);
            window.removeEventListener('mousemove',updatepointer);
            
            
        }
        
        


    },[])
        console.log(pointer)

    


    return (
        <canvas ref={canvaref} className="flex justify-center items-center h-screen w-screen bg-gray-700  cursor-none "/>
    )

}
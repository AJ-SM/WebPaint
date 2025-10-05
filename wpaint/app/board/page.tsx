
"use client"
import React, { useEffect, useRef } from "react"


export default function Board(){
    const canvaref = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        const canva = canvaref.current
        if(!canva) return;

        const ctx = canva.getContext('2d');
        if(!ctx) return;
        ctx.beginPath();
        ctx.arc(95, 50, 40, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill()


    },[])
    

    


    return (
        <canvas ref={canvaref} className="flex justify-center items-center h-screen bg-black"/>
    )

}

"use client"
import React, { useEffect, useRef, useState } from "react"


export default function Board(){
    const canvaref = useRef<HTMLCanvasElement>(null)
    const isPainting = useRef<boolean>(false)
    const pointer = useRef({x:0,y:0})
    const startval = useRef({x:0,y:0})
    const endval = useRef({x:0,y:0})
    const pencil = false;
    const backupArray = useState<CanvasRenderingContext2D[]>([])

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
          startval.current = pointer.current
        
          
        }
            function EndPostion(){
                
            isPainting.current = !isPainting.current
            ctx?.beginPath()
            endval.current=pointer.current
            
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
            //
            function Rect(){
                if(isPainting.current){
                    if(!ctx) return ;
                    ctx.rect(startval.current.x, startval.current.y, endval.current.x-startval.current.x, endval.current.y-startval.current.y);
                    ctx.strokeStyle = "white";
                    ctx.stroke();
                }
            }


            line()
            // Rect();

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

        function undoCanvas(){
            const canvas = canvaref.current;
            if(!canvas) return;
            const ctx = canvas.getContext("2d")
            if(!ctx) return ; 
            

            console.log(ctx)
        }

        function clearCanvas() {
            const canva = canvaref.current;
            if (!canva) return;
            const ctx = canva.getContext("2d");
            if (!ctx) return;
            ctx.clearRect(0, 0, canva.width, canva.height);
            }
        

    


    return (
        
        <>
        <div className=" absolute mt-5 flex justify-center items-center w-screen  h-9 bg-black" >
             <div className=" p-5 mt-1 flex gap-10 items-center absolute bg-white h-9 text-black w-115 rounded-md "> 

            <div className=" cursor-pointer hover:bg-slate-200 h-9 flex justify-center items-center w-9 p-2 rounded-2xl" onClick={()=>{return}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>

            </div>
            <div className=" cursor-pointer hover:bg-slate-200 h-9 flex justify-center items-center w-9 p-2 rounded-2xl" onClick={clearCanvas}>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

                
            </div>
            <div className=" cursor-pointer hover:bg-slate-200 h-9 flex justify-center items-center w-9 p-2 rounded-2xl" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>

            </div>

            <div className=" cursor-pointer hover:bg-slate-200 h-9 flex justify-center items-center w-9 p-2 rounded-2xl" onClick={undoCanvas}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>

                    


            </div>
            <div  className=" cursor-pointer hover:bg-slate-200 h-9 flex justify-center items-center w-9 p-2 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                </svg>

            </div>
            <div  className=" cursor-pointer hover:bg-slate-200 h-9 flex justify-center items-center w-9 p-2 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                </svg>


            </div>

        </div>
        </div>
       
        <canvas ref={canvaref} className="flex justify-center items-center h-screen w-screen bg-black"/>
        </>
    
    )

}
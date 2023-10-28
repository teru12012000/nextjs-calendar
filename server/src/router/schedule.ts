import { Request,Response,Router } from "express";
import { db } from "../db/db";
import { scheduleData } from "../shared/type";

export const schedule=Router();

schedule.get('/initialData',(req:Request,res:Response)=>{
    db.serialize(()=>{
        db.all('SELECT * FROM schedule',(err:Error|null,rows:scheduleData[])=>{
            if(err){
                return res.status(500).json({
                    message:"error",
                })
            }
            const resData:scheduleData[]=rows.map((item:scheduleData)=>({
                id:item.id,
                title:item.title,
                start:item.start,
                end:(item.end)?item.end:undefined
            }))
            return res.status(200).json({
                message:'OK',
                data:rows,
            })
        })
    })
});

schedule.post('/addSchedule',(req:Request,res:Response)=>{
    const {id,title,start,end}=req.body;
    const endData:string=(end)?end:"";
    db.serialize(()=>{
        db.run("INSERT INTO schedule (id,title,start,end) VALUES ($1,$2,$3,$4)",
            [id,title,start,endData],
            (err:Error|null)=>{
                if(err){
                    return res.status(500).json({
                        message:"error",
                    })
                }else{
                    return res.status(200).json({
                        message:'OK',
                    })
                }
            }
        )
    })
});

schedule.put('/changeSchedule',(req:Request,res:Response)=>{
    const {id,title,start,end}=req.body;
    const endData:string=(end)?end:"";
    db.serialize(()=>{
        db.run(
            "UPDATE schedule SET title=$1, start=$2, end=$3 WHERE id=$4",
            [title,start,endData,id],
            (err:Error|null)=>{
                if(err){
                    return res.status(500).json({
                        message:"error",
                    })
                }else{
                    return res.status(200).json({
                        message:'OK',
                    })
                }
            }
        )
    })
});

schedule.delete('/deleteSchedule/:id',(req:Request,res:Response)=>{
    const {id}=req.params;
    db.serialize(()=>{
        db.run(
            "DELETE FROM schedule WHERE id=$1",
            [id],
            (err:Error|null)=>{
                if(err){
                    return res.status(500).json({
                        message:"error",
                    })
                }else{
                    return res.status(200).json({
                        message:'OK',
                    })
                }
            }
        )
    })
});
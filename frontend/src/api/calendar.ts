import { scheduleType } from "@/shared/types";

export const getSchedule=async(url:string)=>{
    const res=await fetch(url);
    const data=await res.json();
    if(data.message==='error'){
        return [] as scheduleType[];
    }else{
        return data.data as scheduleType[];
    }
}
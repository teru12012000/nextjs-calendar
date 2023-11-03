'use client'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getSchedule } from "@/api/calendar";
import interactionPlugin,{ DateClickArg } from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react";
import useSWR from "swr";
import ModalWindow from "../modalWindow";
import { EventClickArg } from "@fullcalendar/core/index.js";
const CalendarComponent = () => {
    const {data,isLoading}=useSWR('http://localhost:5050/schedule/initialData',getSchedule);
    const calendarRef = useRef(null);
    const [isOpend,setIsOpened]=useState<boolean>(false);
    const [arg,setArg]=useState<DateClickArg|EventClickArg|undefined>(undefined);
    const [isCreate,setIsCreate]=useState<boolean>(true);
    return (
        <div style={{margin:20,}}>
            <FullCalendar
                nowIndicator={true}
                ref={calendarRef}
                eventClick={(info:EventClickArg) =>{
                        setIsOpened(true);
                        setIsCreate(false);
                        setArg(info);
                        console.log(info.event.extendedProps, info.event.title)
                    }
                }
                dateClick={(arg:DateClickArg)=>{
                    setIsOpened(true);
                    setIsCreate(true);
                    setArg(arg);
                }}
                editable={true}
                views={{
                    dayGrid: {
                        selectable: true,
                    },
                    timeGrid: {
                        selectable: true,
                    },
                    dayGridMonth: {
                        selectable: false,
                    },
                }}
                
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                events={data}
                locale={"ja"}
                titleFormat={{ year: "numeric", month: "long" }}
                // allDayText={"24h"}
                allDaySlot={true}
                buttonText={{
                today: "今日",
                month: "月",
                week: "週",
                day: "日",
                list: "リスト",
                }}
                headerToolbar={{
                    center: "title",
                    left:""
                }}
            />
            <ModalWindow
                isOpened={isOpend}
                setIsOpened={setIsOpened}
                setArg={setArg}
                isCreate={isCreate}
            />
    </div>
)}
export default CalendarComponent;
'use client'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getSchedule } from "@/api/calendar";
import interactionPlugin,{ DateClickArg } from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";
import { useRef } from "react";
import useSWR from "swr";
const CalendarComponent = () => {
    const {data,isLoading}=useSWR('http://localhost:5050/schedule/initialData',getSchedule);
    const calendarRef = useRef(null);
    return (
        <div style={{margin:20,}}>
            <FullCalendar
                nowIndicator={true}
                ref={calendarRef}
                eventClick={(info) =>
                    console.log(info.event.extendedProps, info.event.title)
                }
                dateClick={(arg:DateClickArg)=>{
                    console.log(arg);
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
    </div>
)}
export default CalendarComponent;
'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from 'react';
import useSWR from 'swr';
import { getSchedule } from '@/api/calendar';
export default function Home() {
  const {data,isLoading}=useSWR('http://localhost:5050/schedule/initialData',getSchedule);
  const calendarRef = useRef(null);
  return (
    <div style={{margin:20}}>
      <FullCalendar
        nowIndicator={true}
        eventClick={(info) =>
          console.log(info.event.extendedProps, info.event.title)
        }
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
        timeZone={"UTF"}
        titleFormat={{ year: "numeric", month: "long" }}
        // allDayText={"24h"}
        allDaySlot={false}
        buttonText={{
          today: "今日",
          month: "月",
          week: "週",
          day: "日",
          list: "リスト",
        }}
        headerToolbar={{
          center: "title",
        }}
      />
    </div>
  )
}

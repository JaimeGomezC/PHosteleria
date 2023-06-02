import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { FormControl,FormGroup,Validators,FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions,Calendar, EventClickArg, DateSelectArg,EventApi } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  loginForm= new FormGroup({
    username:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required)
  })
  datosTurnos?:TurnosService;
  constructor(private turno:TurnosService, private router:Router) {   }
  
  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  legendItems: any[]=[];

  ngOnInit() {
    // need for load calendar bundle first
    this.legendItems = [
      { color: 'red', text: 'Reserva completa' },
      { color: 'green', text: 'Disponible' }
    ];
    this.cargarDatos();
    
  }
  cargarDatos(){
    this.turno.getTurnosPublicados().subscribe(data =>{
          console.log('data.result')
          console.log(data.data)
          console.log(data.data.disponibilidad)
          let turno=data.data.map((e: any) => ({ idTurno:e.data.id,title:e.data.turno, start: e.data.fecha, allDay: true, n_plazas:e.data.n_plazas,fechaReserva:e.data.fecha,id_menu:e.data.id_menu,color:e.disponibilidad }));
          console.log(turno)
          forwardRef(() => Calendar);
          this.calendarOptions = {
            plugins: [dayGridPlugin, interactionPlugin],
            editable: false,
            selectable: false,
            selectMirror: false,
            locale: "es",
            firstDay: 1,
            initialEvents: turno,
            eventColor: turno.color,
            // customButtons: {
            //   myCustomButton: {
            //     text: 'Evento!',
            //     click: function () {
            //       alert('clicked the custom button!');
            //     }
            //   }
            // },
            headerToolbar: {
              left: 'prev,next',//today myCustomButton
              center: 'title',
              right: ''
            },
            //dateClick: this.handleDateClick.bind(this),
            eventClick: this.handleEventClick.bind(this),
            // eventDragStop: this.handleEventDragStop.bind(this)
      
          };
    },
    (error) => {
      console.log(error)
    })
  }  
  handleEventClick(arg: EventClickArg) {
    let data=arg.event.extendedProps;
    console.log("data")
    console.log(data)
    this.router.navigate(['ReservasModal',data]);
  }
  // handleDateClick(arg: DateClickArg) {
  //   console.log('estoy aqui');
  //   console.log(arg);
  //   const title = prompt('Please enter a new title for your event');
  //   const calendarApi = arg.view.calendar;
  //   console.log(calendarApi);
  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       // id: createEventId(),
  //       // title,
        
  //     });
  //   }
  // }

  

  // handleEventDragStop(arg: EventDragStopArg) {
  //   console.log(arg);
  // }

  // updateHeader() {
  //   this.calendarOptions!.headerToolbar = {
  //     left: 'prev,next myCustomButton',
  //     center: 'title',
  //     right: ''
  //   };
  // }

  // updateEvents() {
  //   const nowDate = new Date();
  //   const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

  //   this.calendarOptions!.events = [{
  //     title: 'Updated Event',
  //     start: yearMonth + '-08',
  //     end: yearMonth + '-10'
  //   }];

   
  // }
  
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   plugins: [dayGridPlugin],
  //   weekends: false,
  //   events: [
  //     { title: 'Meeting', start: new Date() }
  //   ]
  // };
  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }
}

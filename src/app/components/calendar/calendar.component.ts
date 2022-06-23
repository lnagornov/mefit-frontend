import {Component, Input} from '@angular/core';

import {CalendarOptions} from '@fullcalendar/angular'; // useful for typechecking

import {Goal} from 'src/app/models/goal.model';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent {

  _goal?: Goal;
  calendarOptions: CalendarOptions = {};

  events: any[] = [
    {title: '', start: '', end: '', color: '#0d6efd'},
  ];

  @Input()
  public set goal(goal: Goal) {
    this._goal = goal;
    this.events[0].title = 'This week goal';
    let startDate = new Date(this._goal?.endDate);
    startDate.setDate(startDate.getDate() - 7);
    this.events[0].start = startDate.toISOString().slice(0, 10);
    this.events[0].end = this._goal?.endDate;
    this.calendarOptions = {
      initialView: 'dayGridMonth', // bind is important!
      events: this.events,
    };
  }
}

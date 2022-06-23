import {Component, Input} from '@angular/core';

import {GoalService} from "../../services/goal.service";


@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent {

  @Input() programId?: number;
  @Input() profileId?: number;
  @Input() name: string = "Press";

  constructor(
    public readonly goalService: GoalService,
  ) { }

  get loading(): boolean {
    return this.goalService.loading;
  }
}

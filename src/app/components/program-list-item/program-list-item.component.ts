import {Component, Input} from '@angular/core';

import {Program} from "../../models/program.model";


@Component({
  selector: 'app-program-list-item',
  templateUrl: './program-list-item.component.html',
  styleUrls: ['./program-list-item.component.scss']
})
export class ProgramListItemComponent {
  @Input() program?: Program;
  @Input() profileId?: number;
  buttonName: string = 'Add to goal';
}

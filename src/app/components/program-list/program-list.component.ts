import {Component, Input} from '@angular/core';

import {Program} from "../../models/program.model";


@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  @Input() programs: Program[] = [];
  @Input() profileId?: number;
}

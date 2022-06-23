import {Component, Input} from '@angular/core';

import {Exercise} from "../../models/exercise.model";


@Component({
  selector: 'app-exercise-list-item',
  templateUrl: './exercise-list-item.component.html',
  styleUrls: ['./exercise-list-item.component.scss']
})
export class ExerciseListItemComponent {
  @Input() exercise?: Exercise | undefined;
  @Input() indexOfElement?: number | undefined;

  goToLink(url: string){
    window.open(url, "_blank");
  }
}

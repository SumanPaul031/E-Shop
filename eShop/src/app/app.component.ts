import { Component } from '@angular/core';
import { ProgressService } from 'src/app/shared/services/progress/progress.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eShop';
  mode = 'determinate';
  value = 0;

  constructor(private progress: ProgressService){
    progress.loaderObservable.subscribe({
      next: (result) => {
        this.mode = (result) ? 'indeterminate' : 'determinate';
      }
    })
  }
}

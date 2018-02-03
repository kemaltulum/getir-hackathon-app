import { Component } from '@angular/core';
import {IMyDrpOptions} from 'mydaterangepicker';
import {BackendService} from './backend.service';
import { Request } from './request.interface';
import { Response } from './response.interface';
import {Record} from './record.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  datePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  private dateRange: any = {
    beginDate: {year: 2016, month: 1, day: 26},
    endDate: {year: 2017, month: 2, day: 2}
  };

  private minCount: number;
  private maxCount: number;

  records: Array<Record>;

constructor(private backendService: BackendService) { }

parseDate(date: {year: number, month: number, day: number}) {
  const monthStr = date.month > 10 ? date.month.toString() : '0' + date.month.toString();
  const dayStr = date.day > 10 ? date.day.toString() : '0' + date.day.toString();

  return date.year.toString() + '-' + monthStr + '-' + dayStr;
}

onSubmit() {
  const request: Request = {
    startDate: this.parseDate(this.dateRange.beginDate),
    endDate: this.parseDate(this.dateRange.endDate),
    minCount: this.minCount,
    maxCount: this.maxCount
  };

  this.backendService.makeRequest(request)
    .subscribe(
      (response: Response) => {
        this.records = response.records;
      },
      (error) => {
        console.log(error);
      }
    );
}
}

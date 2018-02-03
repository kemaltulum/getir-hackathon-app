import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {IMyDrpOptions} from 'mydaterangepicker';
import {MatPaginator, MatTableDataSource} from '@angular/material';

import {BackendService} from './backend.service';
import { Request } from './request.interface';
import { Response } from './response.interface';
import {Record} from './record.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  datePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy-mm-dd'
  };

  dateRange: any = {
    beginDate: {year: 2016, month: 1, day: 26},
    endDate: {year: 2017, month: 2, day: 2}
  };

  minCount: number;
  maxCount: number;

  recordsDataSource = new MatTableDataSource<Record>();

  displayedColumns: Array<string> = [
    'id', 'key', 'value', 'createdAt', 'totalCount'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.recordsDataSource.paginator = this.paginator;
  }

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
        this.recordsDataSource.data = response.records;
      },
      (error) => {
        console.log(error);
      }
    );
}
}

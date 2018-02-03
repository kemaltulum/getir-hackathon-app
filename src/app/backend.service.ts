import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Request } from './request.interface';
@Injectable()
export class BackendService {

  constructor(private httpClient: HttpClient) { }

  endpoint = 'https://getir-bitaksi-hackathon.herokuapp.com/searchRecords';

  makeRequest(request: Request){
    return this.httpClient.post(this.endpoint, request);
  }
}

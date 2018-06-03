
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  data: any;
  public eventRef:firebase.database.Reference;
  event:any;
  constructor(private http : Http ) {
    console.log('Hello DataProvider Provider');
  }
 
  }

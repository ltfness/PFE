import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  uid: string;
  indexs :any;
  resultArray: any[];
  eventList:any =[];
  public user:firebase.User;
  constructor(public navCtrl: NavController, 
    public auth:AngularFireAuth,
    private db : AngularFireDatabase) {
      let data= this.db.list('clubs').valueChanges().subscribe( t1 => { 
        // console.log(t1);
         t1.forEach(element=>{
          
           this.resultArray = Object.keys(element['events']).map(function(personNamedIndex){
            let person = element['events'][personNamedIndex];
            // do something with person
            return person;
        });
        this.resultArray.forEach(ev=>{
          
         console.log(ev,ev.title);
         this.eventList.push(ev);
         console.log(this.eventList);
         
        });
       
           });   
          
      });
    }
}

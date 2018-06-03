
import { Component  } from '@angular/core';
import { AngularFireDatabase   } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController} from 'ionic-angular';
import * as firebase from 'firebase';
import { SearchPipe } from "../../pipes/search/search";
import { AngularFireAuth } from 'angularfire2/auth';
@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  resultArray: any[];
  item: any;
  inx:any;
  title; 
  today :any = new Date() ;
  dd : any  = this.today.getDate();
  mm : any  = this.today.getMonth()+1; //January is 0!
  yyyy : any = this.today.getFullYear();
 public eventsList:Array<any>;
 public source:Array<any>;
 public loadedeventsList:Array<any>;
 public user:firebase.User;
 public uid;
  eventList:any =[];
  constructor(
    public auth:AngularFireAuth,
     public navCtrl: NavController, 
     public navParams: NavParams  ,
     private db : AngularFireDatabase, 
     public alertCtrl: AlertController,
     public actionSheetCtrl: ActionSheetController) 
     { 
      // this.user = this.auth.auth.currentUser;
      // this.uid = this.user.uid;
      // db.list(`/clubs/${this.uid}/events`).valueChanges().subscribe((data)=>{
      //   this.eventList = data ;
      //   this.source = data ; 
      //   console.log("data:",data);    
      // });

// if(this.mm<10) {
//     this.mm = '0'+this.mm
// }
// this.today = this.yyyy + '-' + this.mm + '-' + this.dd;
// let t1 =  this.db.list('/events').valueChanges().subscribe((t1)=>{
// t1.forEach(element=>{
// let tab : any = [] ;
// tab.push(element)
// console.log(tab);
// if(tab[0].date<this.today){
// // this.db.object(`events/`+tab[0].key).remove();
// this.eventList.list(`events/`+tab[0].key).remove();
// }else{ 
// console.log("false");
// }});});
let data= this.db.list('clubs').valueChanges().subscribe( t1 => { 
  // console.log(t1);
     t1.forEach(element=>{  
     this.resultArray = Object.keys(element['events']).map(function(personNamedIndex){
      let e = element['events'][personNamedIndex];
      return e;
  });
  this.resultArray.forEach(ev=>{ 
   this.eventList.push(ev);  
  });
 
     });   
    
});

}
presentActionSheet(key) {
let actionSheet = this.actionSheetCtrl.create({
title: 'Modify your Event',
buttons: [
  {
    text: 'Modify',
    role: 'modify',
    handler: () => {
      this.navCtrl.push('ModifyeventPage' , { 
        key : key
      });
    }
  },
  {
    text: 'Delete',
    role: 'delete',
    handler: () => {
      this.showConfirm(key);
        
    }
  }
]
});
actionSheet.present();
}
isadmin(){
if (firebase.auth().currentUser){
return true;
  
}else 
return false
}

getItems(searchbar) {
      var q = searchbar.srcElement.value;
      console.log(q);
      this.eventList = this.source;
      if (q.trim() != '') {
        this.eventList = this.eventList.filter((v) => {
          if(v.title && q) {
            return (v.title.toLowerCase().indexOf(q.toLowerCase()) > -1) ;    
        } 
      })
    
    }

  }


PushToAddPage(){
this.navCtrl.push('AddeventPage');
}
showConfirm(key) {
  const confirm = this.alertCtrl.create({
    title: 'Delet this event?',
    message: 'Do you agree to delete this event?',
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('no supp');
        }
      },
      {
        text: 'Agree',
        handler: () => {
         this.db.object(`events/${key}`).remove();
         
        }
      }
    ]
  });
  confirm.present();
}

}
            


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-actualites',
  templateUrl: 'actualites.html',
})
export class ActualitesPage {

  dif: any;
  acts : Array<any>=[] ; 
  public user:firebase.User;
  public uid;
  public eventRef:firebase.database.Reference;
  today = new Date();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db:AngularFireDatabase,
    public auth:AngularFireAuth
  ) { 
    // this.user = this.auth.auth.currentUser;
    // this.uid = this.user.uid;
//     this.eventRef = firebase.database().ref(`/clubs/${this.uid}/events`);
  
//   this.eventRef.on('value', indexList => {
//     indexList.forEach( index => {
//       this.acts.push(index.val());
      
//       console.log(this.acts);          
      
//       return false;
//     });
//     ;})
//     console.log(this.acts);
//     let t1 =  this.db.list(`/clubs/${this.uid}/events`).valueChanges().subscribe((t1)=>{
//       t1.forEach(element=>{
//        let tab : any = [] ;
//         tab.push(element)
//         console.log(tab[0].h);
//         console.log(this.today.getHours());
        
//         if((this.today.getHours()-tab[0].h)!=0){
//             this.dif=this.today.getHours()-tab[0].h + " heures";
//           }else
//           if((this.today.getMinutes()-tab[0].m)!=0){
//             this.dif=this.today.getMinutes()-tab[0].m+ " minutes";
//           }
// });
     
//         });
      }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ActualitesPage');
  }

} 

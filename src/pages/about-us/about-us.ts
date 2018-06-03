import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  clubs : any ; 

  constructor(public navCtrl: NavController, public navParams: NavParams,private db : AngularFireDatabase) {
    this.clubs = db.list('/clubs').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
})
export class ListePage {
  clubs : any ; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {
    this.clubs = db.list('/clubs').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListePage');
  }

}

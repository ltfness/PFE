import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModifyClubPage } from '../modify-club/modify-club';
import { JeGerunClubPage } from '../je-gerun-club/je-gerun-club';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth:AngularFireAuth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  pushtoauthentificationpage(){
    this.navCtrl.push('AuthentificationPage');
  }

  pushtojegereclubpage(){
    this.navCtrl.push('JeGerunClubPage');

  }
  SettingClub(){
    this.navCtrl.push('ParametreClubPage');
  }
}

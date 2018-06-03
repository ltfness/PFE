import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-authentification',
  templateUrl: 'authentification.html',
})
export class AuthentificationPage {
 
  club={} ;
 
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthentificationPage');
    
    
  }
  async connection(club) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(club.email, club.password);
      if (result) {
        
        this.navCtrl.setRoot(HomePage);
     
        
      }  else
        {

      }
    }
    catch (e) {
      console.error(e);

    }
  }
  pushtojegereunclub(Creator){
    this.navCtrl.push('JeGerunClubPage');
  }
}

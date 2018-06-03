import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {DomSanitizer} from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-parametre-club',
  templateUrl: 'parametre-club.html',
})
export class ParametreClubPage {
user ;   
Image :string ;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams, 
     public afAuth:AngularFireAuth, 
     public db:AngularFireDatabase,
     public alertCtrl: AlertController,public sanitizer : DomSanitizer) {
      this.Image ="https://firebasestorage.googleapis.com/v0/b/songs-d5441.appspot.com/o/logo2.png?alt=media&token=d7766f0b-250e-470e-9cfd-ba8147147cc2";

    this.user = this.afAuth.auth.currentUser;
  }
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParametreClubPage');
  }
  logout(){
    this.afAuth.auth.signOut();
    this.navCtrl.push('AuthentificationPage');
   }
   modifyClub(){
     this.navCtrl.push('ModifyClubPage');
   }
 
   deleteClub() {
    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Vous-ête sure de supprimer votre club ?',
      buttons: [
        {
          text: 'Non',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            console.log('Agree clicked');
              this.db.object(`clubs/${this.user.uid}`).remove();
              this.logout();

          }
        }
      ]
    });
    confirm.present();
  }
}

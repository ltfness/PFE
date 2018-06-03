import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera,CameraOptions  } from 'ionic-native';
import * as firebase from 'firebase';


import { AngularFireAuth } from 'angularfire2/auth';
//import { AuthentificationPage } from '../authentification/authentification';

/**
 * Generated class for the ModifyeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifyevent',
  templateUrl: 'modifyevent.html',
})
export class ModifyeventPage {
  events: any;
  title: any;
  prix: any;
  date: any;
  lieu: any;
  event: any ;
  key: any;
  public captureDataUrl : any;
  public filename = Math.floor(Date.now() / 1000);
  public eventphoto :any ;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private Camera : Camera ,
              public db:AngularFireDatabase) {
                this.key = this.navParams.get('key');
                console.log("key to updated : ",this.key);
                db.list('events').valueChanges().subscribe((data)=>{
                this.event = data ; 
                console.log("event", data); 
                this.event =  data ,
                this.lieu =  this.event.lieu,
                this.date = this.event.date ,
                this.prix = this.event.prix ,
                this.eventphoto = this.event.image ; 
                this.title = this.event.title 
                

                })               
        }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyeventPage');
  }

  editevent(event){  
    this.db.object(`events/${this.key}`).update({
      title: this.title,
      date: this.date,
      prix: this.prix,
      lieu: this.lieu,
     // img:this.eventphoto
    });
     this.navCtrl.pop();
    
}
  selectPhoto(){
    const cameraOptions: CameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      quality: 50,
      destinationType:Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
    };
  
    Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
  
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      console.log(this.captureDataUrl);
      this.uploadPhoto(this.captureDataUrl);
      this.getPHotoUrl();
      
    }, (err) => {
      // Handle error
      console.log("erreuuuuur");
    });
  }
  // fonction uplod la photo selectionner au firebase
  uploadPhoto(photo){
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${this.filename}.jpg`);
  
    imageRef.putString(photo, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.eventphoto=snapshot.downloadURL;
      console.log("image: ",snapshot.downloadURL);
  
     // Do something here when the data is succesfully uploaded!
  
    });
  }
  getPHotoUrl(){
    firebase.storage().ref().child('images/'+this.filename+'.jpg').getDownloadURL().then((url)=>{
      this.eventphoto=url;
      console.log(this.eventphoto);
      
    })
  }

  }

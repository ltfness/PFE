import { Component} from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
//import { DataProvider } from '../../providers/data/data';
import { AngularFireList } from 'angularfire2/database';
import { Camera, CameraOptions } from 'ionic-native';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from '@firebase/util';

@IonicPage()
@Component({
  selector: 'page-addevent',
  templateUrl: 'addevent.html',
})
export class AddeventPage {
  uid: string;
  indexs;
   events : Array<any>=[] ; 
   club : Array<any>=[] ; 

  ClubName:any ;
  clublogo:any;
  rem;
  publication=new Date();
  event : any = {
    clubname:'',
    title:'',
    date:'',
    lieu:'',
    prix:''
  };
  user: firebase.User;
  public captureDataUrl : any;
  public filename = Math.floor(Date.now() / 1000);
  public eventphoto :any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private Camera : Camera ,
    public afd:AngularFireDatabase ,

  public auth:AngularFireAuth) {
    this.rem = firebase.database().ref('clubs/' ); 
    afd.list('clubs').valueChanges().subscribe((data)=>{
      this.indexs = data ;
      console.log(this.indexs); 
    })
    this.user = this.auth.auth.currentUser;
    this.uid = this.user.uid;
    console.log("uid: ",this.uid);
    
    /*this.afd.on('value', indexList => {
      //indexList.forEach( index => {
        this.events.push(index.val());
        console.log(index.val());
        return false;
      });
      ;}) */

    this.rem.on('value', indexList => { 
      indexList.forEach( index => {
     if(index.val().prop==firebase.auth().currentUser.uid)
     {
         this.ClubName=index.val().clubname ;  
         this.clublogo=index.val().img; 
     }
        this.club.push(index.val());
        return false;
      });
      ;})
      console.log('rem', this.rem);
      
  }

  //fonction ajout des events a la base de donnees events
  ajouter(event){

  this.event.clubname = this.indexs[0].clubname;
  let eventkey = this.afd.list(`/clubs/${this.uid}/events`).push({});
   eventkey.set({
    key : eventkey.key,
    clubname: event.clubname,
    title: event.title,
    date: event.date,
    lieu: event.lieu,
    prix: event.prix,
   // img:this.eventphoto
   });
  this.navCtrl.push('EventsPage'); 
  }
//fonction de selection du foto a partir du galleri 
selectPhoto(){
  const cameraOptions: CameraOptions = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    quality: 50,
    destinationType:Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE
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
import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CompleterService } from 'ng2-completer';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-modify-club',
  templateUrl: 'modify-club.html',
})
export class ModifyClubPage {
  myPhotosReference:any;
  public captureDataUrl : any;

  public filename = Math.floor(Date.now() / 1000);
  public clubphoto :any ;
     
    user; 
    clubname: any;
    clubusername: any;
    clubpassword: any;
    club:any;
  key:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view:ViewController,
    private Camera : Camera,
    private afAuth: AngularFireAuth,
    public db:AngularFireDatabase,
    private completerService: CompleterService,myElement: ElementRef) {
      this.user = this.afAuth.auth.currentUser;
      db.list('clubs').valueChanges().subscribe((data)=>{
        this.club = data ; 
      console.log("club :", data); 
      this.club =  data ,
      this.clubname =  this.club.clubname,
      this.clubusername = this.club.clubusername,
      this.clubpassword = this.club.clubpassword 
      //this.img = this.club.image ; 
      })               
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyClubPage');
  }
  modify(club){
    this.db.object(`clubs/${this.user.uid}`).update({
      clubname:this.clubname,
      clubusername:this.clubusername,
      clubpassword:this.clubpassword,
      //img:this.clubphoto
    })
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
     this.getphotoUrl();
     
   }, (err) => {
     // Handle error
     console.log("erreuuuuur");
   }); 
 } 
 uploadPhoto(photo){
   let storageRef = firebase.storage().ref();
   // Create a timestamp as filename

   // Create a reference to 'images/todays-date.jpg'
   const imgRef = storageRef.child(`images/${this.filename}.jpg`);
 
   imgRef.putString(photo, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     this.clubphoto=snapshot.downloadURL;
     console.log("image: ",snapshot.downloadURL);
 
    // Do something here when the data is succesfully uploaded!
 
   });
 }

 getphotoUrl(){
   firebase.storage().ref().child('images/'+this.filename+'.jpg').getDownloadURL().then((url)=>{
     this.clubphoto=url;
     console.log(this.clubphoto);  
   })
 }
}

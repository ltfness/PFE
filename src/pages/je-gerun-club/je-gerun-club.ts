import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController,ViewController, NavParams, Item, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Camera, CameraOptions, Firebase } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthentificationPage } from '../authentification/authentification';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { HomePage } from '../home/home';
import { Element } from '@angular/compiler';
import  { ClubnameValidator } from './customvalidator';


@IonicPage()
@Component({
  selector: 'page-je-gerun-club',
  host: {
    '(document:click)': 'handleClick($event)',
},
  templateUrl: 'je-gerun-club.html',
})
export class JeGerunClubPage {
   i : number ; 
   j:number;
    public query = '';
    public filteredList = [];
    public elementRef;
    t2  : any = []; 
    stringsTest : any = [];
    stringsTest2 : any = [] ; 
    allUniv: any = [] ; 
    user: firebase.User;
  club={
  clubname:'', 
  clubusername:'', 
  cluburl:'',
  clubpassword:'',
  datecreation:''
  }
  isexist:boolean;
  myPhotosReference:any;
  public captureDataUrl : any;
  public filename = Math.floor(Date.now() / 1000);
  public clubphoto :any ;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public view:ViewController,
     private Camera : Camera,
     private afAuth: AngularFireAuth,
     public af : AngularFireDatabase , 
     public db:AngularFireDatabase,
     myElement: ElementRef,
     public toastCtrl: ToastController,
     public alertCtrl: AlertController
    ){ 
      this.myPhotosReference = firebase.storage().ref('/images/'); 
      let all = [] ;
      this.db.list('universities').valueChanges().subscribe((t1 => {
      t1.forEach(element => {
        element['univ'].forEach(un => {
          this.allUniv.push(un.name);
        });
      });
      }));
     this.elementRef = myElement;
    }
    ionViewDidLoad() { }
    
  ajouterunclub(club){
      let data = this.db.object(`/clubs/${this.user.uid}`).set({
        prop : this.user.uid,
        clubname: this.club.clubname,
        clubusername: this.club.clubusername,
      // img:this.clubphoto,
        university: this.query,
        confirmed : false 
      }).then(res=>{
       this.af.list('universities').valueChanges().subscribe( t1 => {              
        t1.forEach(element => {
         let inx=element['univ'].findIndex(i => i.name === this.query);   
          element['univ'].forEach(un => {
          let nbc = un.nbclub ;    
          if ( un.name == this.query){          
              nbc++ ; 
            this.db.object(`/universities/${t1.indexOf(element)}/univ/${inx}`).update({
            nbclub: nbc
            });
            return true     
          }
        });      
       });
   });});
  }

handleClick(event){
  var clickedComponent = event.target;
  var inside = false;
  do {
      if (clickedComponent === this.elementRef.nativeElement) {
          inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
  } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
}
filter() {
  if (this.query !== ""){
      this.filteredList = this.allUniv.filter(function(el){
          return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
  }else{
      this.filteredList = [];
  }}
  select(item){
      this.query = item;      
      this.filteredList = [];
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
    const imgRef = storageRef.child(`images/${this.filename}.jpg`);
    imgRef.putString(photo, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.clubphoto=snapshot.downloadURL;
      console.log("image: ",snapshot.downloadURL);
    });
  }
getphotoUrl(){
    firebase.storage().ref().child('images/'+this.filename+'.jpg').getDownloadURL().then((url)=>{
      this.clubphoto=url;
      console.log(this.clubphoto);  
    })
  }
async register(club) {
  this.db.list('clubs', ref => ref.orderByChild('clubname').equalTo(club.clubname))
  .valueChanges().subscribe(ee => {
    
    if(ee && ee.length > 0) {
      
      console.log(club.clubname);
      
      
   // this.showAlert();
   console.log("exist deja ");
   
    }
    else {
      this.afAuth.auth.createUserWithEmailAndPassword( club.cluburl,
        club.clubpassword)
      .then(data => {
        this.user = this.afAuth.auth.currentUser;
        this.ajouterunclub(club);
        this.db.list('users').push({
          nomClub:this.club.clubname,
          owner:true
        });
        this.navCtrl.push(HomePage);
      });
    }
  });
  }

  
  closemodal(){
    this.navCtrl.setRoot(HomePage); 
   }
   showAlert() {
    let alert = this.alertCtrl.create({
      title: 'clubname déjà exist !',
      subTitle: 'verifier le nom de club !',
      buttons: ['OK']
    });
    alert.present();
  }
}
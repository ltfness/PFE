import { Component  ,  ViewChild , ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var  google : any;
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-clubs',
  templateUrl: 'clubs.html', 
})
export class ClubsPage {
  longuitude: any;
  latitude: any;
  map: any;
  @ViewChild('map') mapElement: ElementRef;
  clubs : any ; 
  tab  : any = []; 
    stringsTest : any ;

  constructor(public navCtrl: NavController, public navParams: NavParams , private db : AngularFireDatabase) {
    this.clubs = db.list('/clubs').valueChanges();
   // this.univMarkers();
  }
  ionViewDidLoad() {
    this.displayMap();
   //this.univMarkers();
  }
  displayMap(){


      let latLng = new google.maps.LatLng();
    
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    
      this.map = new google.maps.Map(this.mapElement.nativeElement, 
      mapOptions);
  }
  addMarker(position,map){
    return new google.maps.Marker({
      position,
      map,
      label:""
    });
  }
  univMarkers(){
    let t1 =  this.db.list('/universities').valueChanges().subscribe((t1)=>{
      t1.forEach(element=>{
        this.stringsTest = element;
          this.stringsTest.univ.forEach(univer => {
            this.latitude=univer.lat;
            this.longuitude=univer.lng;
           console.log("latitude :",this.latitude ) ;
           console.log("  longuitude :",this.longuitude);
          }); });
          console.log("institut  : " + this.tab + "/n" );
      });
  }
}

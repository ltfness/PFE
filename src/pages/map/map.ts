import { Component  ,  ViewChild , ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
zoom:number =10;
label:string
ele: any ;
stringsTest: any;
markers= [{
  lat:0,
  lng:0,
  label:''
}];
latee: number = 36.805721;
lngee: number =  10.169882;
clubs : any = [];
lat : number ; 
constructor(public navCtrl: NavController, public navParams: NavParams,public  db:AngularFireDatabase) {
  this.db.list('universities').valueChanges().subscribe((t1 => {   
    //console.log(t1);         
    t1.forEach((element =>{    
      element['univ'].forEach(un => {
        //console.log('un :',un);     
        console.log(un.nbclub);
          
        this.markers.push({
          lat : un.lat,
          lng : un.lng,
          label : un.nbclub});    
      });  
      console.log("markers :",this.markers);           
   }));    
}));
} 
ionViewDidLoad(){
  console.log('ionViewDidLoad HomePage');
}
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DataProvider } from '../../providers/data/data';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-top10',
  templateUrl: 'top10.html',
})
export class Top10Page {

 
  data: any;
  resultArray: any[];
  mydata: any = [];
  tab: any =[];
  patdata: any = [] ;
 
  constructor(public navCtrl: NavController, public navParams: NavParams , private service : DataProvider ,private http : Http)  {
    console.log("json called"); 
        this.http.get('assets/top10.json').map((res) => res.json()).subscribe(data => {
        this.patdata = data.top10;
       console.log(this.patdata); 
    
 
      for(let i = 0 ; i<10 ;i++){
            this.tab = this.patdata[i];
         
            this.mydata.push(this.tab);
           
      }
      console.log("aaa",this.mydata);
      for(let j=0 ; j<10 ;j++){
        this.data = this.mydata;
        
      }
      console.log(this.data);

      }, (rej) => {console.error('Could not load local data',rej)});


             
  
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Top10Page');
  }

}

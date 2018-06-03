import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { ListePage } from '../liste/liste';
import { MapPage } from '../map/map';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = 'ListePage';
    this.tab2 = 'MapPage';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}

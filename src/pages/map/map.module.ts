import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MapPage,
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBvZp7hgqUpmFctRyQrV5LzAI39LdEJqL4'})
  ],
})
export class MapPageModule {}

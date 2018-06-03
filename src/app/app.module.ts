import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Ng2SimpleAutocomplete } from 'ng2-simple-autocomplete';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import {  AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { Camera } from 'ionic-native';
//importation des bibliothéque pour l'authentification
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import {   Geolocation} from '@ionic-native/geolocation';
import {RlTagInputModule} from 'angular2-tag-input';
import { Ng2CompleterModule } from 'ng2-completer';
import {HttpModule} from '@angular/http';

var config = {
  apiKey: "AIzaSyBmbN3zx4lc2vMwNuivtvQCZU-xwxCqx3c",
  authDomain: "songs-d5441.firebaseapp.com",
  databaseURL: "https://songs-d5441.firebaseio.com",
  projectId: "songs-d5441",
  storageBucket: "songs-d5441.appspot.com",
  messagingSenderId: "492742175407"
};
//firebase.initializeApp(config)

@NgModule({
  declarations: [
    MyApp,
    HomePage,  
    Ng2SimpleAutocomplete
  ],
  imports: [
    BrowserModule,
    Ng2CompleterModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RlTagInputModule,
    HttpModule,
    
   ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    DataProvider,
    StatusBar,
    SplashScreen,
    Camera,
    NativeGeocoder,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

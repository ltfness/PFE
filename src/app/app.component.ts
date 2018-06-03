import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthentificationPage } from '../pages/authentification/authentification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 
  @ViewChild(Nav) nav: Nav;

  rootPage: any=HomePage;
  pages: Array<{title: string, component: any}>;
 
  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private modelclr:ModalController,
             private afAuth: AngularFireAuth) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Actualities', component: HomePage },
      {title: 'Events',component:'EventsPage' },
      {title: 'Clubs',component:'TabsPage' },
      {title: 'Top10',component:'Top10Page' },
      {title: 'Setting',component:'SettingPage' },
      {title: 'About Us ',component:'AboutUsPage' },
   //   {title: 'Je gére un club ', component:JeGerunClubPage}
    ];
    this.afAuth.authState.subscribe();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  pushtoauthentificationpage(){
   let modal = this.modelclr.create('AuthentificationPage') ;
   modal.present();
  }
}

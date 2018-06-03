import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';

export class ClubnameValidator {


  static validClubname(fc: FormControl, db: AngularFireDatabase){
    db.list('clubs').valueChanges().subscribe( t1 => { 
        t1.forEach(cl=>{
         if(fc.value.toLowerCase() === cl['clubname']){
      return {
        validClubname: true
      };
    } else {
      return null;
    }
}); 
});
}} 

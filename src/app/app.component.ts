import { Component } from '@angular/core';
import {FormGroup, Validators,FormControl } from "@angular/forms";
import {HttpClient, } from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 title :'frontendTest';

  constructor(public dialog: MatDialog,private http: HttpClient) {}

  infos: any;
  exform = new FormGroup({

      'countrycode' : new FormControl(null, [Validators.required ,Validators.minLength(2), Validators.maxLength(2),

      ]),
      'format' : new FormControl('1', Validators.required),
      'accesskey': new FormControl({value:'eb588dbf70cb81df1c8d374269db9d18',disabled: true}, Validators.required),
      'phone' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          Validators.minLength(4),
          Validators.maxLength(12)
        ]),
    });
  sendDetails(phone: number,countrycode:string){
    let resp =this.http.get('http://apilayer.net/api/validate?access_key='+'eb588dbf70cb81df1c8d374269db9d18'+'&number='+phone+'&country_code='+countrycode+'&format=1');
     resp.subscribe((data)=>this.infos=data,response => {
       response.json();


     });

    let dialogRef =this.dialog.open(DialogComponent ,{
    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log("Dialog Closed");
    })
  }

  get phone() {
    return this.exform.get('phone');
  }
  get accesskey() {
    return this.exform.get('accesskey');
  }
  get countrycode() {
    return this.exform.get('countrycode');
  }

}

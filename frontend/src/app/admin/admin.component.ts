import { FriandisesService } from './../friandises.service';
import { friandises } from './../models/modelBD';
import { Observable } from 'rxjs';
import { Component,OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  confirmDelete =false;

friandisesForm: FormGroup;

friandisesList$:Observable<friandises[]>;

  constructor(private formBuilder: FormBuilder, private FriandisesService : FriandisesService) { }

  ngOnInit(): void {
    this.initFriandisesForm();
    this.friandisesList$ = this.FriandisesService.Friandises();
  }

  initFriandisesForm(){
    this.friandisesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      cie: ['', Validators.required]
    });

    }

onSubmitFriandisesForm(){

  const newFriand :friandises=this.friandisesForm.value;
  this.FriandisesService.createFriandise(newFriand);
  this.friandisesForm.reset();

  ($('#exampleModal') as any).modal('hide');
   ($('#confirm') as any).modal('show');

}

onDelete(friandises:friandises){
  if(confirm("Êtes-vous sûr de vouloir supprimer  "+friandises.title)) {
  this.FriandisesService.delFriandise(friandises);
}
}
  }

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; //importer la classe permettaant d'utiliser le module observale
import { friandises } from './../models/modelBD'; //importer l'interface utilisee a l'item a
import { FriandisesService } from './../friandises.service';//importer la classe utilise a l'item b


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content:string;
  content2:string;

  friandisesList$:Observable<friandises[]>;//Instancierla   classe   du   service   que   vous   avez   créée dans   le   fichier friandises.service.ts.

  constructor(private FriandisesService: FriandisesService) { }//Créer  une  propriété  instanciée  avec  la  classe observableet  typéeselon l’interface

  ngOnInit(): void {

    this.friandisesList$ = this.FriandisesService.Friandises();//Récupérer,dans la propriété de l’item a) ci-haut, le retour fourni par la méthode interne de la classe instanciéeà l’item b).

  }

  getSold(friandises:friandises){
    if (friandises.category == "choco"){
      this.content='yoo';
      }
     if(friandises.category == "chips"){
    this.content2='xoo';
      }
  }



  getSoldValue(friandises:friandises){
    if (friandises.category=="choco"){
      return 'brown';
    }
    else{
      return 'red';
      }
  }



}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {friandises} from './models/modelBD';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriandisesService {

    //baseUrl = 'http://10.30.40.121:3015'
    baseUrl = 'http://localhost:3015'
  constructor(private HttpClient : HttpClient) { }

Friandises(): Observable<friandises[]> {

return this.HttpClient.get<friandises[]>(`${this.baseUrl}/friandises`);

}
createFriandise(friandise:friandises){

  console.log(friandise);

  return this.HttpClient.post<friandises> (`${this.baseUrl}/newFriandise`,friandise).subscribe(

  ()=>{

    console.log("Ok");



  },
  (error)=>{

  console.log('Erreur')

}

  );
}



delFriandise(friandise:friandises){

  console.log(friandise);

  return this.HttpClient.delete<friandises> (`${this.baseUrl}/delfriandise/`+friandise._id).subscribe(

  ()=>{
    location.reload(true);
    console.log("Is deleted succesfully");


  },
  (error)=>{

  console.log('Erreur')

}

  );
}


}

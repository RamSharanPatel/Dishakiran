import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiServices {

  constructor(private http: HttpClient) { 
  }
  public getJSON(str:string) {
    return this.http.get("./assets/data/"+str+".json");
}
}
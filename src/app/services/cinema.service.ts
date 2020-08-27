import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string = "http://localhost:8081";

  //Instanciation HttpClient
  constructor(private http : HttpClient) { }

  /**
   *Service Get List of villes
   */
  public getVilles(){
    return this.http.get(this.host+"/villes");
  }

  /**
   * Retourn les cinemas d'une ville
   * @param v
   */
   getCinemas(v) {
    console.log("********* Get CinemasByVilles **************")
    return this.http.get( v._links.cinemas.href);
  }

  getSalles(c) {
    console.log("********* Get SallesByCinemes **************")
    return this.http.get( c._links.salles.href);
  }

  getProjection(salle) {
     console.log("********* Get Projection Salle **************")
      console.log("url : "+salle._links.projections.href)
     let url = salle._links.projections.href.replace("{?projection}","");
    return this.http.get( url+"?projection=p1");
  }

  /**
   * Get Projection TicketProj
   * @param p
   */
  getTicketPlace(p) {
    console.log("********* Get Ticket Projection **************")
    console.log("url : "+p._links.tickets.href)
    let url = p._links.tickets.href.replace("{?projection}","");
    return this.http.get( url+"?projection=ticketProj");
  }
}

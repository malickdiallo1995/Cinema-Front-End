import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CinemaService} from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes;
  public cinemas;
  public ville;
  public salles;

  public currentVille;
  public currentCinema;
  public  currentProjection;

  constructor(private cinemaService : CinemaService,private http:HttpClient) { }

  //A l'initialisation
  ngOnInit(): void {
    //Requete vers le backend pour la liste des villes
   // this.http.get("http://localhost:8081/villes")

    this.cinemaService.getVilles()
      .subscribe(data => {
        this.villes = data;
      },error => {
        console.log(error);
      })
  }

  onGetCinema(v) {
    this.currentVille = v;
    this.cinemaService.getCinemas(v)
      .subscribe(data => {
        this.cinemas = data;
      },error => {
        console.log(error);
      })
  }

  onSave(v: any) {
    this.ville = v;
    return v;
  }

  onGetSalles(c) {
    this.currentCinema = c;
    this.cinemaService.getSalles(c)
      .subscribe(data => {
        console.log('************ salles **************');
        console.log(this.salles);
        this.salles = data;

        //Parcour List Salles
        this.salles._embedded.salleses.forEach(salle=>{
          //Recuperer les projections d'une salle
           this.cinemaService.getProjection(salle)
             .subscribe(data => {
               //Stocker les projections dans la salle
               salle.projections = data;
             },error => {
               console.log(error);
             })
        })
      },error => {
        console.log(error);
      })
  }

  /**
   * Get Places by salles
   * @param p
   */
  onGetTicketPlaces(p) {
    this.currentProjection = p;
    this.cinemaService.getTicketPlace(p)
      .subscribe(data => {
        //Stocker les projections dans la salle
        this.currentProjection.tickets = data;
      },error => {
        console.log(error);
      })
  }
}

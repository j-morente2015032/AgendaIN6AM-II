import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable() 
export class CategoriaService{
    uriCategoria = "http://localhost:3000/api/categorias";
    categorias:any[];

    //Constructor
    constructor(private _http: Http, private _router: Router){
    }

    //Obtener Categorias
    getCategorias() {
        return this._http.get(this.uriCategoria)
        .map(res => {
            this.categorias = res.json();
        });
    }

    //Agregar Categoria
    public addCategoria(categoria: any) {
    let categoriaUri:string = "http://localhost:3000/api/categorias/";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({headers: headers});
    let data = JSON.stringify(categoria);

    this._http.post(categoriaUri, data, options)
      .subscribe(res => {
        console.log(res.json());
        this._router.navigate(['dashboard/categoria']);
      }, error => {
        console.log(error.text());
      });
  }

  //Eliminar Categoria
    public deleteCategoria(idCategoria:  any){
    let uriEliminarCategoria :string = "http://localhost:3000/api/categorias/" + idCategoria;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers})
    this._http.delete(uriEliminarCategoria, options)
      .subscribe(res => {
        console.log(res.json());
        this._router.navigate(['dashboard']);
      }, error => {
        console.log(error.text());
      });
  }

}
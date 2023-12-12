import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";

import 'rxjs/add/operator/toPromise'
import { ServiceInterface } from "../interfaces/service.interface";

import { Contato } from "./contato.model";
import { CONTATOS } from "./contatos-mock";

@Injectable()
export class ContatoService implements ServiceInterface<Contato> {

    private apiContatosUrl: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'application/json'});// é do tipo 'Headers' e recebe a nova instancia de 'Headers'

    constructor(
        private http: Http
    ) { }

    // getContatos(): Contato[]{
    //    return CONTATOS; 
    // }
    // getContatos(): Promise<Contato[]> {//retornando uma 'Promise'
    findAll(): Promise<Contato[]> {//retornando uma 'Promise'
        return this.http.get(this.apiContatosUrl)
            .toPromise() // convertemos o 'Observable' em numa 'Promise'
            .then(response => response.json().data as Contato[])//convertemos para 'json', 'as Contato[]' => significa que ela retorna uma lista de contatos 
            .catch(this.handleError);

        // return Promise.resolve(CONTATOS);


    }

    find(id: Number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => {
                return contatos.find((contato) => {//'find()' é um metodo para arrays
                    return contato.id === id;
                });
            });
    }

    create(contato: Contato): Promise<Contato>{
        return this.http.post(this.apiContatosUrl, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then((response:Response) =>{
            // console.log(response.json().data);
            
          return response.json().data as Contato;
        })
        .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const url = `${this.apiContatosUrl}/${contato.id}`;// app/contatos/:id
        return this.http.put(url, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then(() =>{
            // console.log(response.json().data);
            
          return contato as Contato;
        })
        .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato>{
        const url = `${this.apiContatosUrl}/${contato.id}`;// app/contatos/:id
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() =>{
            // console.log(response.json().data);
            
          return contato as Contato;
        })
        .catch(this.handleError);   
    }

    private handleError(err: any): Promise<any>{
        console.log('Erro: ', err);
        
        return Promise.reject(err.message || err);
    }

    // getContatosSlowly(): Promise<Contato[]> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(resolve, 2000) //valores de forma assíncrona
    //     })
    //         .then(() => {
    //             console.log('primeiro "then"');
    //             return 'Curso Angular 2 Mona Garcia'
    //         })
    //         .then((param: string) => {
    //             console.log('segundo "then"');
    //             console.log(param);

    //             return new Promise((resolve2, reject2) => {
    //                 setTimeout(() =>{
    //                     console.log('continuando depois de 4 segundos...');
    //                     resolve2();

    //                 }, 4000)
    //             });
    //         })
    //         .then(() => {
    //             console.log('terceiro "then"');
    //             return this.getContatos()
    //         });// ou como esta na linha abaixo
    //     // .then(() => this.getContatos());
    // }

search(term: string): Observable<Contato[]>{
    return this.http.get(`${this.apiContatosUrl}/?nome=${term}`)
    .map((res: Response) => res.json().data as Contato[]);
}

    
}
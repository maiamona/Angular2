"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        this.apiContatosUrl = 'app/contatos';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // é do tipo 'Headers' e recebe a nova instancia de 'Headers'
    }
    // getContatos(): Contato[]{
    //    return CONTATOS; 
    // }
    // getContatos(): Promise<Contato[]> {//retornando uma 'Promise'
    findAll() {
        return this.http.get(this.apiContatosUrl)
            .toPromise() // convertemos o 'Observable' em numa 'Promise'
            .then(response => response.json().data) //convertemos para 'json', 'as Contato[]' => significa que ela retorna uma lista de contatos 
            .catch(this.handleError);
        // return Promise.resolve(CONTATOS);
    }
    find(id) {
        return this.findAll()
            .then((contatos) => {
            return contatos.find((contato) => {
                return contato.id === id;
            });
        });
    }
    create(contato) {
        return this.http.post(this.apiContatosUrl, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response) => {
            // console.log(response.json().data);
            return response.json().data;
        })
            .catch(this.handleError);
    }
    update(contato) {
        const url = `${this.apiContatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http.put(url, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => {
            // console.log(response.json().data);
            return contato;
        })
            .catch(this.handleError);
    }
    delete(contato) {
        const url = `${this.apiContatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => {
            // console.log(response.json().data);
            return contato;
        })
            .catch(this.handleError);
    }
    handleError(err) {
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
    search(term) {
        return this.http.get(`${this.apiContatosUrl}/?nome=${term}`)
            .map((res) => res.json().data);
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map
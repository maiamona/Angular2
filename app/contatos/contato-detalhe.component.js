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
const contato_model_1 = require("./contato.model");
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const contato_service_1 = require("./contato.service");
let ContatoDetalheComponent = class ContatoDetalheComponent {
    constructor(contatoService, route, location) {
        this.contatoService = contatoService;
        this.route = route;
        this.location = location;
        this.isNew = true; // atributo privado
    }
    ngOnInit() {
        // console.log('on Init');
        this.contato = new contato_model_1.Contato(null, '', '', '');
        this.route.params.forEach((params) => {
            let id = +params['id'];
            // console.log(typeof id);
            // console.log(id);
            if (id) {
                this.isNew = false;
                this.contatoService.find(id)
                    .then((contato) => {
                    // console.log(contato);
                    this.contato = contato;
                });
            }
        });
    }
    getFormGroupClass(isValid, isPristine) {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }
    getFormControlClass(isValid, isPristine) {
        return {
            'form-control': true,
            'has-control-danger': !isValid && !isPristine,
            'has-control-success': isValid && !isPristine
        };
    }
    // teste():void{
    //     console.log(this.contato);   
    // }
    // teste(form):void{
    //     console.log(form);   
    // } 
    onSubmit() {
        // console.log(this.contato); 
        // console.log('novo:', this.isNew);
        let promise;
        if (this.isNew) {
            console.log('cadastrar contato');
            promise = this.contatoService.create(this.contato);
        }
        else {
            console.log('alterar contato');
            promise = this.contatoService.update(this.contato);
        }
        promise.then(contato => this.goBack()); //'location.back()' => pera ele voltar no historico, ou seja na pagina anterior que acessamos
    }
    goBack() {
        this.location.back();
    }
};
ContatoDetalheComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-detalhe',
        templateUrl: 'contato-detalhe.component.html',
        styleUrls: [
            'contato-detalhe.component.css'
        ]
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.ActivatedRoute,
        common_1.Location])
], ContatoDetalheComponent);
exports.ContatoDetalheComponent = ContatoDetalheComponent;
//# sourceMappingURL=contato-detalhe.component.js.map
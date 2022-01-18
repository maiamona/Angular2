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
const Subject_1 = require("rxjs/Subject");
const Observable_1 = require("rxjs/Observable");
const contato_service_1 = require("./contato.service");
const router_1 = require("@angular/router");
let ContatoBuscaComponent = class ContatoBuscaComponent {
    constructor(contatoService, router) {
        this.contatoService = contatoService;
        this.router = router;
        this.buscarChange = new core_1.EventEmitter();
        this.termosDaBusca = new Subject_1.Subject();
    }
    ngOnInit() {
        this.contatos = this.termosDaBusca
            .debounceTime(500) //aguarde por 500ms para emitir novos eventos
            .distinctUntilChanged() //ignore se o proximo termo de busca for igual ao anterior
            .switchMap(term => {
            // console.log('Fez a busca: ', term);
            return term ? this.contatoService.search(term) : Observable_1.Observable.of([]);
        })
            .catch(erro => {
            console.log(erro);
            return Observable_1.Observable.of([]);
        });
        // this.contatos.subscribe((contatos: Contato[]) => {
        //     console.log('retornou do servidor: ', contatos);
        // });
    }
    ngOnChanges(changes) {
        let busca = changes['buscar'];
        // console.log(changes);
        // console.log(busca);
        this.search(busca.currentValue);
    }
    search(termo) {
        // console.log(termo);
        this.termosDaBusca.next(termo);
        this.buscarChange.emit(termo);
    }
    verDetalhe(contato) {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscarChange.emit('');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ContatoBuscaComponent.prototype, "buscar", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ContatoBuscaComponent.prototype, "buscarChange", void 0);
ContatoBuscaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contato-busca',
        templateUrl: 'contato-busca.component.html',
        styleUrls: [
            'contato-busca.component.css'
        ]
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        router_1.Router])
], ContatoBuscaComponent);
exports.ContatoBuscaComponent = ContatoBuscaComponent;
//# sourceMappingURL=contato-busca.component.js.map
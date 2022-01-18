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
const dialog_service_1 = require("./../dialog.service");
const contato_service_1 = require("./contato.service");
// import { CONTATOS } from "./contatos-mock";
let ContatosListaComponent = class ContatosListaComponent {
    // 'contatoService: ContatoService = new ContatoService();' => não se utiliza dessa forma no 'Angular 2', apenas se utiliza a injeção de dependencia como esta na linha abaixo porque o sistema de dependencia do Angular 2 sabe como criar corretamento uma nova 'new' intancia da classe
    constructor(contatoService, dialogService) {
        this.contatoService = contatoService;
        this.dialogService = dialogService;
        // 'OnInit' => é uma interface de ciclo de vida do Angular 2
        this.contatos = [];
    }
    ngOnInit() {
        // this.contatos = this.contatoService.getContatos();
        this.contatoService.findAll()
            .then((contatos) => {
            this.contatos = contatos;
        })
            .catch(erro => {
            console.log(erro);
            this.mostrarMensagem({
                tipo: 'danger',
                texto: 'Ocorreu um erro ao buscar a lista de contatos!'
            });
        });
        // this.contatoService.getContatosSlowly()
        //         .then((contantos: Contato[]) =>{
        // this.contatos = contantos;
        //         })
        //    .catch(erro => console.log(erro));
    }
    onDelete(contato) {
        // console.log(contatos);
        this.dialogService.confirm(`Deseja deletar o contato ${contato.nome}?`)
            .then((canDelete) => {
            if (canDelete) {
                this.contatoService.delete(contato)
                    .then(() => {
                    this.contatos = this.contatos.filter((c) => c.id != contato.id);
                    this.mostrarMensagem({
                        tipo: 'success',
                        texto: 'Contato deletado!'
                    });
                })
                    .catch(erro => {
                    console.log(erro);
                    this.mostrarMensagem({
                        tipo: 'danger',
                        texto: 'Ocorreu um erro ao deletar o contacto!'
                    });
                });
            }
        });
    }
    mostrarMensagem(mensagem) {
        this.mensagem = mensagem;
        this.mostrarClasses(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            if (this.currentTimout) {
                clearTimeout(this.currentTimout); // cansela i timeOut anterior
            }
            this.currentTimout = setTimeout(() => {
                this.mensagem = undefined;
            }, 3000);
        }
        else {
            setTimeout(() => {
                this.mensagem = undefined;
            }, 6000);
        }
    }
    mostrarClasses(tipo) {
        this.classesCss = {
            'alert': true,
        };
        this.classesCss['alert-' + tipo] = true; // alert-danger, alert-success, ...
        /**
         {
             'alert': true,
             'alert-success': true,
             'alert-danger': false;
             ...
         }
         */
    }
};
ContatosListaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'contatos-lista',
        templateUrl: 'contatos-lista.component.html'
    }),
    __metadata("design:paramtypes", [contato_service_1.ContatoService,
        dialog_service_1.DialogService])
], ContatosListaComponent);
exports.ContatosListaComponent = ContatosListaComponent;
//# sourceMappingURL=contatos-lista.component.js.map
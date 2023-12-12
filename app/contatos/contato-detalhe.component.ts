import { Contato } from './contato.model';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { ContatoService } from "./contato.service";

@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html',
    styleUrls: [
        'contato-detalhe.component.css'
    ]
})
export class ContatoDetalheComponent implements OnInit {

contato: Contato;// atributo
private isNew: boolean = true;// atributo privado

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        // console.log('on Init');
        this.contato = new Contato(null, '', '', '');
        this.route.params.forEach((params: Params) => {
            let id: Number = +params['id'];
            // console.log(typeof id);
            // console.log(id);
            if (id) {

                this.isNew = false;
                
                this.contatoService.find(id)
                .then((contato: Contato) =>{
                    // console.log(contato);
                    this.contato = contato;
                });
            }
        });
    }

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }

    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
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

    onSubmit():void{
        // console.log(this.contato); 
        // console.log('novo:', this.isNew);
        let promise; 

        if (this.isNew) {
            console.log('cadastrar contato');
            promise = this.contatoService.create(this.contato); 
        } else{
            console.log('alterar contato');  
            promise = this.contatoService.update(this.contato);
        }

        promise.then(contato => this.goBack());//'location.back()' => pera ele voltar no historico, ou seja na pagina anterior que acessamos
    }

    goBack(): void{
        this.location.back();
    }
}
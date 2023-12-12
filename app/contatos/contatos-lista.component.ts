import { Component, OnInit } from "@angular/core";
import { DialogService } from "./../dialog.service";
import { Contato } from "./contato.model";
import { ContatoService } from "./contato.service";
// import { CONTATOS } from "./contatos-mock";

@Component({//aqui vai os nossos meta dados
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
    // providers: [
    //     ContatoService
    // ]
})
export class ContatosListaComponent implements OnInit {
    // 'OnInit' => é uma interface de ciclo de vida do Angular 2

    contatos: Contato[] = [];
    mensagem: {};
    classesCss: {};
    private currentTimout: any;

    // 'contatoService: ContatoService = new ContatoService();' => não se utiliza dessa forma no 'Angular 2', apenas se utiliza a injeção de dependencia como esta na linha abaixo porque o sistema de dependencia do Angular 2 sabe como criar corretamento uma nova 'new' intancia da classe

    constructor(
        private contatoService: ContatoService,
        private dialogService: DialogService
    ) { }
    ngOnInit(): void {//significa que este metodo não retorna nada

        // this.contatos = this.contatoService.getContatos();


        this.contatoService.findAll()
            .then((contatos: Contato[]) => {
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
    onDelete(contato: Contato): void {
        // console.log(contatos);
        this.dialogService.confirm(`Deseja deletar o contato ${contato.nome}?`)
            .then((canDelete: boolean) => {
                if (canDelete) {
                    this.contatoService.delete(contato)
                        .then(() => {
                            this.contatos = this.contatos.filter((c: Contato) => c.id != contato.id);

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

private mostrarMensagem(mensagem: {tipo: string, texto: string}):void{//metodo privado
    this.mensagem = mensagem;
    this.mostrarClasses(mensagem.tipo);
    if (mensagem.tipo != 'danger') {
        if (this.currentTimout) {
           clearTimeout(this.currentTimout); // cansela i timeOut anterior
        }
       this.currentTimout = setTimeout(() =>{
            this.mensagem = undefined;
                }, 3000);  
    } else{
        setTimeout(() =>{
            this.mensagem = undefined;
                }, 6000);
    }
   
}

private mostrarClasses(tipo: string): void{
    this.classesCss = {
        'alert': true,
    };
    this.classesCss['alert-' + tipo] = true;// alert-danger, alert-success, ...
/**
 {
     'alert': true,
     'alert-success': true,
     'alert-danger': false;
     ...
 }
 */
}

}
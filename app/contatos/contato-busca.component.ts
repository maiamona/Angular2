import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, SimpleChange, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { Router } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styleUrls: [
        'contato-busca.component.css'
    ]
    // ,
    // inputs: [
    //    'buscar:mySearch' 
    // ]
})
export class ContatoBuscaComponent implements OnInit, OnChanges {

    @Input() buscar: string;
    @Output() buscarChange: EventEmitter<string> = new EventEmitter<string>();
    //    @Input('mySearch') buscar: string;
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void { //quando inicializamos o nosso componente
        this.contatos = this.termosDaBusca
            .debounceTime(500)//aguarde por 500ms para emitir novos eventos
            .distinctUntilChanged()//ignore se o proximo termo de busca for igual ao anterior
            .switchMap(term => {//'switchMap()' operador dos 'Observables'
                // console.log('Fez a busca: ', term);

                return term ? this.contatoService.search(term) : Observable.of<Contato[]>([]);
            })
            .catch(erro => {
                console.log(erro);
                return Observable.of<Contato[]>([]);
            });

        // this.contatos.subscribe((contatos: Contato[]) => {
        //     console.log('retornou do servidor: ', contatos);

        // });
    }

    ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['buscar'];
        // console.log(changes);
        // console.log(busca);
        this.search(busca.currentValue);

    }

    search(termo: string): void {
        // console.log(termo);
        this.termosDaBusca.next(termo);
        this.buscarChange.emit(termo);
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscarChange.emit('');
    }
}

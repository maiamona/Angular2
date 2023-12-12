import { Contato } from './contatos/contato.model';
import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        
        let contatos: Contato[] = [
            {id:1, nome: 'Emanuel', email: 'emanuelcazevo@gmail.com', telefone: '000000000'},
            {id:2, nome: 'Maiamona', email: 'manomona2@hotmail.com', telefone: '923744720'},
            {id:3, nome: 'Mixa', email: 'miguelcazevo@gmail.com', telefone: '111111111'},
            {id:4, nome: 'Lucy', email: 'lucindacazevo@gmail.com', telefone: '222222222'},
            {id:5, nome: 'Jane', email: 'juremagarcia@gmail.com', telefone: '333333333'},
        ];

        let carros: any[] = [
            {id: 1, descricao: 'Camaro'},
            {id: 2, descricao: 'Mustang'}
        ];

        // return {contatos}
        return {
            'contatos': contatos,
            'carros': carros
        }
    };
}
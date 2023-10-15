import { Injectable } from '@angular/core';
import { Receita } from '../pratos/prato';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private PATH : string = 'receita'

  constructor( private angularFirestore: AngularFirestore) {
    let c1 : Receita = new Receita('Pão com mateiga', ['pão', 'manteiga'] ,'Pegue o pão e passe manteiga nele');
    c1.tipo = 0
    c1.image = "https://media-cdn.tripadvisor.com/media/photo-s/09/fe/4e/47/pao-com-manteiga-na-chapa.jpg"
    this.listaDeReceitas.push(c1);
   }

   cadastrar(receita : Receita){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
   }

   buscarTodos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

   deletar(receita : Receita){
    return this.angularFirestore.collection(this.PATH).doc(receita.id).delete();
   }

   atualizar(receita : Receita , id : string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({
      nome: receita.nome,
      ingrediente: receita.ingrediente,
      preparo: receita.preparo,
      criador: receita.criador,
      historia: receita.historia,
      tipo: receita.tipo,
      image: receita.image
    })

   }

   obterPorIndice(indice : number) : Receita{
    return this.listaDeReceitas[indice];
   }
  }
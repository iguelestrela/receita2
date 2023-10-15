import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CadastrarService } from 'src/app/services/cadastrar/cadastrar.service';
import { Receita } from 'src/app/services/pratos/prato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  public nome! : string;
  public preparo! : string;
  public criador! : string;
  public historia!: string;
  public tipo!: number;
  public image!: any;
  novoIngrediente: string = '';
  ingredientes: string[] = [];
  index!: number;
  receita!: Receita;
  
  constructor(private alertController: AlertController,
    private router : Router, private cadastrarService : CadastrarService,
    private routeAct : ActivatedRoute) {
      this.routeAct.paramMap.subscribe(params => {
        const index = params.get('index');
        console.log('Índice recebido na página de detalhes:', index);
      });
     }

  ngOnInit() {
    this.routeAct.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam !== null) {
        this.index = +indexParam;
      }
    });

    this.receita = this.cadastrarService.obterPorIndice(this.index);
    this.nome = this.receita.nome;
    this.preparo = this.receita.preparo;
    this.criador = this.receita.criador;
    this.historia = this.receita.historia;
    this.tipo = this.receita.tipo;
    this.image = this.receita.image;
    this.ingredientes = this.receita.ingrediente;
  }

  editar(){
    if(this.nome && this.ingredientes && this.preparo){
      let novaReceita : Receita = new Receita(this.nome, this.ingredientes, this.preparo);
      novaReceita.criador = this.criador;
      novaReceita.historia = this.historia;
      novaReceita.tipo = this.tipo;
      novaReceita.image = this.image;
      this.cadastrarService.cadastrar(novaReceita);
      this.router.navigate(["/home"]);
    }else{
      this.presentAlert("Erro de cadastro", "Campos não preenchidos corretamente!");
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Erro!!!',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  adicioneImagem(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  adicionarIngrediente() {
    if (this.novoIngrediente.trim() !== '') {
      this.ingredientes.push(this.novoIngrediente);
      this.novoIngrediente = ''; // Limpa o campo de entrada
    }
  }

  removerIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }

  excluir(){
    this.cadastrarService.deletar(this.index);
    this.router.navigate(["/home"]);
  }
}

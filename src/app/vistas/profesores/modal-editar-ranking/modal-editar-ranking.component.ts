import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  Form,
} from '@angular/forms';
import { TokenService } from '../../../../services/token.service';
import { debounceTime, tap } from 'rxjs/operators';
import { RankingService } from 'services/ranking.service';
import { Ranking } from '../../../interfaces/Ranking';

@Component({
  selector: 'app-modal-editar-ranking',
  templateUrl: './modal-editar-ranking.component.html',
  styleUrls: ['./modal-editar-ranking.component.css']
})
export class ModalEditarRankingComponent implements OnInit {

  submitted: boolean = false;
  rank: any;

  modRankForm!: FormGroup;

  @Input() rankSelec:any;

  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private tokenService: TokenService,
    private rankService: RankingService
  ) { }

  ngOnInit(): void {
    this.crearForm();
  }

  crearForm() {
    this.modRankForm = this.formBuilder.group({
      nomRank: [this.rankSelec.nomRank, Validators.required],
    });

    this.modRankForm.controls.nomRank.setValue(this.rankSelec.nom_rank);
  }

  retornar() {
    this.modalService.dismissAll();
    this.submitted = false;
  }

  get nombreEntrega() {
    return this.modRankForm.get('nomRank') as FormControl;
  }

  get form() {
    return this.modRankForm.controls;
  }

  enviar(modal: any) {
    console.log("abrir modal editar rank");
    this.modalService.open(modal);
  }

  //FALTA PONER CHECK NOMBRE RANKING

  onSubmit(form: any) {
    console.log(form.controls.nomRank.value);
    console.log(this.rankSelec);
    if (this.modRankForm.valid) {
      let ranking: Ranking = {
        id_rank: this.rankSelec.id_rank,
        nom_rank: this.modRankForm.get('nomRank')?.value,
        alumnos: this.rankSelec.alumnos,
        cod_rank: this.rankSelec.cod_rank
      };
      console.log(ranking);

      this.rankService.modificarRanking(ranking).subscribe();

      window.location.reload();
    }
  }
}

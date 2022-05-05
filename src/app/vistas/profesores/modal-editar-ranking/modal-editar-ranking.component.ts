import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  Form,
} from '@angular/forms';
import { TokenService } from '../../../../services/auth/token.service';
import { debounceTime, tap } from 'rxjs/operators';
import { RankingService } from 'services/ranking.service';
import { Ranking } from '../../../interfaces/Ranking';

@Component({
  selector: 'app-modal-editar-ranking',
  templateUrl: './modal-editar-ranking.component.html',
  styleUrls: ['./modal-editar-ranking.component.css'],
})
export class ModalEditarRankingComponent implements OnInit {
  submitted: boolean = false;
  rank: any;

  modRankForm!: FormGroup;

  @Input() rankSelec: any;

  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private tokenService: TokenService,
    private rankService: RankingService
  ) {}

  ngOnInit(): void {
    this.crearForm();
    this.checkNombre();
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

  get nomRank() {
    return this.modRankForm.get('nomRank') as FormControl;
  }

  get form() {
    return this.modRankForm.controls;
  }

  enviar(modal: any) {
    console.log('abrir modal editar rank');
    this.modalService.open(modal);
  }

  //FALTA PONER CHECK NOMBRE RANKING
  checkNombre() {
    this.form.nomRank.valueChanges.subscribe((nomRank) => {
      this.rankService
        .validarNombreExisteRanking(this.rankSelec.id_profe, nomRank)
        .subscribe((val: any) => {
          if (nomRank == this.rankSelec.nom_rank) {
          } else {
            if (val.resultado == 'error') {
              this.nomRank.markAsPending({ onlySelf: false });
              this.nomRank.setErrors({ notUnique: true });
            }
          }
        });
    });
  }

  onSubmit() {
    if (this.modRankForm.valid) {
      let ranking: Ranking = {
        id_rank: this.rankSelec.id_rank,
        nom_rank: this.modRankForm.get('nomRank')?.value,
        alumnos: this.rankSelec.alumnos,
        cod_rank: this.rankSelec.cod_rank,
      };

      this.rankService.modificarRanking(ranking).subscribe();

      window.location.reload();
    }
  }
}

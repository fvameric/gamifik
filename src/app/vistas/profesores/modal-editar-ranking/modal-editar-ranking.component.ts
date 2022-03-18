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
      nomRank: ['', Validators.required],
    });
  }

  retornar() {
    this.modalService.dismissAll();
    this.submitted = false;
  }

  enviar(modal: any) {
    this.modalService.open(modal);
  }

  onSubmit(form: any) {
    console.log(form.controls.nomRank.value);
    console.log(this.rankSelec);
  }
}

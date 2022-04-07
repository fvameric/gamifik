import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-podium',
  templateUrl: './modal-podium.component.html',
  styleUrls: ['./modal-podium.component.css'],
})
export class ModalPodiumComponent implements OnInit {
  constructor() {}

  @Input() rankSelec: any;

  ngOnInit(): void {}
}

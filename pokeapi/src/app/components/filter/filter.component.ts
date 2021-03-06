import { Component, OnInit, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() interval = new EventEmitter(); 

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {}

  filter(initial, final, pokemonPerPage, pagination){
    if(this.verifyEmptyValue(initial, final)){
      this.showErrorInitialOrFinalValueIsEmpty();
      return
    }
    if(this.verifyInitialIsBiggerFinalValue(initial, final))
      this.showErrorInitialIsBiggerFinalValue()
    else
      this.interval.emit([initial, final, pokemonPerPage, pagination]);
  }

  verifyEmptyValue(initial, final){
    if(initial == '' || final == ''){
      return true
    }
  }

  verifyInitialIsBiggerFinalValue(initial, final) {
    return Number(initial) > Number(final) ? true : false;
  }

  showErrorInitialOrFinalValueIsEmpty(){
    Swal.fire({
      title: 'Opa..',
      text: 'O valor inicial e/ou final está vazio',
      icon: 'error',
      confirmButtonText: 'Tudo bem'
    }) 
  }

  showErrorInitialIsBiggerFinalValue() {
    Swal.fire({
      title: 'Opa..',
      text: 'O valor inicial foi maior que o final. O valor inicial deve ser menor que o final',
      icon: 'error',
      confirmButtonText: 'Tudo bem'
    })
  }
}

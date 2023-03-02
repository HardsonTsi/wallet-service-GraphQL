import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wallet} from "../../Wallet";
import {Router} from "@angular/router";
import {WalletService} from "../services/wallet.service";

@Component({
  selector: 'wallet-card',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit{
  @Input() wallet: Wallet;
  @Output() deleteWalletTrigger = new EventEmitter()

  constructor(private router: Router,
              protected walletService: WalletService) {
  }

  ngOnInit(){
  }

  goToWalletDetails(wallet: Wallet){
    this.router.navigate(['wallet', wallet.id])
  }

}

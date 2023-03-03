import {Component, Input, OnInit} from '@angular/core';
import {Wallet} from "../../Wallet";
import {Router} from "@angular/router";
import {WalletService} from "../services/wallet.service";

@Component({
    selector: 'wallet-card',
    templateUrl: './wallet-card.component.html',
    styleUrls: ['./wallet-card.component.css']
})
export class WalletCardComponent implements OnInit {
    @Input() wallet: Wallet;

    constructor(private router: Router,
                protected walletService: WalletService) {
    }

    ngOnInit() {
    }

    goToWalletDetails(wallet: Wallet) {
        this.router.navigate(['wallet', wallet.id])
    }

}

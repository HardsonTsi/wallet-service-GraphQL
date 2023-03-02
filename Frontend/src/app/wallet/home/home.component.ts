import {Component, OnInit} from '@angular/core';
import {Currency, Wallet, WalletDTO} from "../../Wallet";
import {WalletService} from "../services/wallet.service";
import {ActivationStart, Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    wallets: Wallet[];
    currencies: Currency[];
    constructor(private router: Router,
                private walletService: WalletService) {
    }

    ngOnInit(): void {
        this.getWallets()
    }

    getWallets() {
        this.walletService.getWallets()
            .valueChanges.subscribe(({data}) => {
            this.wallets = data.userWallets
            console.log(this.wallets)
        }, error => console.log(error))
    }

    addWallet(){
        let walletDTO: WalletDTO = new WalletDTO()
        walletDTO.balance = 0
        walletDTO.currencyCode = 'USD'
        this.walletService.addWallet(walletDTO)
            .subscribe(
                ({data}) => {
                    console.log(data)
                    this.getWallets()
                },
                error => console.log(error))
    }



    deleteWallet(id: string){
        this.walletService.deleteWallet(id)
            .valueChanges.subscribe(
            ({data}) => {
                this.getWallets()
                console.log(data)
            },
            error => console.log(error)
        )
    }

    getCurrencies() {
        this.walletService.getCurrencies()
            .valueChanges.subscribe(({data}) => {
                this.currencies = data.currencies
            }, error => console.log(error)
        )
    }

}

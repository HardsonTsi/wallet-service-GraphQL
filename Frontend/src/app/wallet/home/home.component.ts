import { Component, OnInit} from '@angular/core';
import {Currency, Wallet, WalletDTO} from "../../Wallet";
import {WalletService} from "../services/wallet.service";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    wallets: Wallet[];
    currencies: Currency[];
    walletDTO: WalletDTO = new WalletDTO();
    walletFormState: boolean = false;
    walletFormStateTrigger(state: boolean){
        this.walletFormState = state
    }

    constructor(private router: Router,
                private toastService: ToastService,
                private walletService: WalletService) {
    }


    ngOnInit(): void {
        this.getWallets()
    }

    getWallets() {
        this.walletService.getWallets()
            .subscribe(({data}) => {
            this.wallets = data.userWallets
            this.wallets = this.wallets.reverse()
        }, error => console.log(error))
    }

    addWallet(){
        this.walletService.addWallet(this.walletDTO)
            .subscribe(
                ({data}) => {
                    this.walletFormStateTrigger(false)
                    this.walletDTO = new WalletDTO()
                    this.toastService.showToast('Portefeuille ajouté')
                    this.getWallets()
                },
                error => {
                    console.log(error)
                    this.toastService.showToast('Portefeuille non ajouté')
                })
    }

    getCurrencies() {
        this.walletService.getCurrencies()
            .subscribe(({data}) => {
                this.currencies = data.currencies
            }, error => console.log(error)
        )
    }

}

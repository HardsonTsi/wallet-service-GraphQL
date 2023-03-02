import {Component, OnInit} from '@angular/core';
import {TransferDTO, Wallet} from "../../Wallet";
import {WalletService} from "../services/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../services/toast.service";
import {CurrencyPipe} from "@angular/common";

@Component({
    selector: 'wallet-details',
    templateUrl: './wallet-details.component.html',
    styleUrls: ['./wallet-details.component.css']
})
export class WalletDetailsComponent implements OnInit {

    id: string;

    wallet: Wallet;
    transfer: TransferDTO = new TransferDTO();
    transactionState: boolean
    tranferFormState: boolean = false

    transactionStateTrigger(state: boolean) {
        this.transactionState = state
    }

    transferFormStateTrigger(state: boolean){
        this.tranferFormState = state
    }

    constructor(
        private route: ActivatedRoute,
                private router: Router,
                private toastService: ToastService,
                protected walletService: WalletService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id']
        this.getWalletById(this.id)
    }





    getWalletById(walletId: string) {
        this.walletService.getWalletById(walletId)
            .valueChanges.subscribe(
            ({data}) => {
                this.wallet = data.walletById
                console.log(data.walletById)
            },
            error => console.log(error)
        )
    }

    doTransfer() {
        this.transactionStateTrigger(true)
        this.transfer.sourceId = this.id
        this.walletService.doTransfer(this.transfer)
            .subscribe(
                datas => {
                    this.getWalletById(this.id)
                    this.transfer = new TransferDTO()
                    this.transferFormStateTrigger(false)
                    this.toastService.showToast('Transaction effectué')
                },
                error => {
                    console.log(error)
                    this.toastService.showToast('Echec de la transaction')
                }
            )
    }

    goBack() {
        this.router.navigate(['home'])
    }

}

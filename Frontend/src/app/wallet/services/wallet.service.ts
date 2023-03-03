import {Injectable} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {TransferDTO, Wallet, WalletDTO} from "../../Wallet";
import {CurrencyPipe} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    constructor(private apollo: Apollo,
                private currencyPipe: CurrencyPipe,) {
    }

    getWallets() {
        let getWallets = gql`query{
            userWallets{
                id,
                balance,
                currency {
                    name
                }
            }
        }`
        return this.apollo.subscribe<any>({
            query: getWallets
        })
    }

    getWalletById(walletId: string) {
        let getWalletById = gql`query($walletId: String){
            walletById(id: $walletId){
                id,
                balance,
                currency {
                    name
                }
                walletTransactions {
                    type,
                    amount
                }
            }
        }`
        return this.apollo.subscribe<any>({
            query: getWalletById,
            variables: {
                walletId: walletId
            }
        })
    }

    addWallet(wallet: WalletDTO) {
        let addWallet = gql`mutation($wallet: WalletDTO){
            addWallet(wallet: $wallet){
                id,
                balance
            }
        }`
        return this.apollo.mutate({
            mutation: addWallet,
            variables: {
                wallet: wallet
            }
        })
    }

    doTransfer(transfer: TransferDTO) {
        let doTransfer = gql`mutation($transfer: TransferDTO){
            transfer(transfer: $transfer){
                balance
            }
        }`
        return this.apollo.mutate({
            mutation: doTransfer,
            variables: {
                transfer: transfer
            }
        })
    }

    deleteWallet(walletId: string){
        let deleteWallet = gql`query($id: String){
            deleteWallet(id: $id)
        }`
        return this.apollo.subscribe<any>({
            query: deleteWallet,
            variables: {
                id: walletId
            }
        })
    }

    getCurrencies() {
        let getCurrencies = gql`query {
            currencies {
                code,
                name,
                salePrice
            }
        }`
        return this.apollo.subscribe<any>({
            query: getCurrencies
        })
    }

    transformWalletBalance(wallet: Wallet){
        return this.currencyPipe.transform(wallet.balance, wallet.currency.name)
    }

    transformBalance(amount: number, currency: string){
        return this.currencyPipe.transform(amount, currency);
    }


}

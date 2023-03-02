import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {WalletRoutingModule} from "./wallet-routing.module";
import { HomeComponent } from './home/home.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { WalletComponent } from './wallet-card/wallet.component';
import { LoaderComponent } from './loader/loader.component';
import { TransactionPipe } from './pipes/transaction.pipe';
import {FormsModule} from "@angular/forms";
import { BalancePipe } from './pipes/balance.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    WalletDetailsComponent,
    WalletComponent,
    LoaderComponent,
    TransactionPipe,
    BalancePipe
  ],
  imports: [
    CommonModule,
      FormsModule,
      WalletRoutingModule
  ],
  providers: [CurrencyPipe]
})
export class WalletModule { }

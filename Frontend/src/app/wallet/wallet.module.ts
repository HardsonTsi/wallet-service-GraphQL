import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {WalletRoutingModule} from "./wallet-routing.module";
import { HomeComponent } from './home/home.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { WalletCardComponent } from './wallet-card/wallet-card.component';
import { LoaderComponent } from './loader/loader.component';
import { TransactionPipe } from './pipes/transaction.pipe';
import {FormsModule} from "@angular/forms";
import { BalancePipe } from './pipes/balance.pipe';
import {WalletService} from "./services/wallet.service";
import {ClipboardModule} from "@angular/cdk/clipboard";



@NgModule({
  declarations: [
    HomeComponent,
    WalletDetailsComponent,
    WalletCardComponent,
    LoaderComponent,
    TransactionPipe,
    BalancePipe
  ],
  imports: [
    CommonModule,
      FormsModule,
    ClipboardModule,
      WalletRoutingModule
  ],
  providers: [CurrencyPipe, WalletService]
})
export class WalletModule { }

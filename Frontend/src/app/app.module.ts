import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { GraphQLModule } from './graphql.module';
import {CommonModule} from "@angular/common";
import {WalletModule} from "./wallet/wallet.module";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        GraphQLModule,
        WalletModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}

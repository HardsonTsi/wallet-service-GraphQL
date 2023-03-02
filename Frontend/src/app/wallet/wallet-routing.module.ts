import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WalletDetailsComponent} from "./wallet-details/wallet-details.component";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'wallet/:id', component: WalletDetailsComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class WalletRoutingModule {
}

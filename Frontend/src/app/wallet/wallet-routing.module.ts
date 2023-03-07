import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WalletDetailsComponent} from "./wallet-details/wallet-details.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'wallet/:id', component: WalletDetailsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletRoutingModule {
}

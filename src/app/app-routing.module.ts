import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizationGuard} from "./core/helpers/authorization.guard";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const chatModule = () => import('./components/chat/chat.module').then(x => x.ChatModule);
const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/account/register'},
  {path: 'chat', loadChildren: chatModule, canActivate: [AuthorizationGuard]},
  // TODO - hide account module if user is authenticated
  {path: 'account', loadChildren: accountModule},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}

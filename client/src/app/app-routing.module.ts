import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from './public/public.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => PublicModule,
  },
  // {
  //   path: 'authentication',
  //   loadChildren: () => AuthModule,
  //   canActivate: [LoginGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

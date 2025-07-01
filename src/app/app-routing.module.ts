import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
},
{
  path: 'tabs',
  loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
},
  {
    path: 'apirest',
    loadChildren: () => import('./apirest/apirest.module').then( m => m.ApirestPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('./modificar/modificar.module').then( m => m.ModificarPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

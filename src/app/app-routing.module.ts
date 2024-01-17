import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'solicitudes/listar',
    loadChildren: () => import('./paginas/solicitudes/listar/listar.module').then( m => m.ListarPageModule)
  },
  {
    path: 'solicitudes/crear',
    loadChildren: () => import('./paginas/solicitudes/crear/crear.module').then( m => m.CrearPageModule)
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./paginas/configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

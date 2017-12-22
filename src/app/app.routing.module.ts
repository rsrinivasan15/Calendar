import { RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
const appRoutes: Routes = [
  { path: '',      redirectTo: 'calendar', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
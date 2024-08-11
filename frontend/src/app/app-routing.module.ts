import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AllAccountComponent } from './account/all-account/all-account.component';
import { WaitAccountComponent } from './account/wait-account/wait-account.component';
import { BlobComponent } from './blob/blob.component';
import { WaitBlobComponent } from './blob/wait-blob/wait-blob.component';
import { ContainerComponent } from './container/container.component';
import { WaitContainerComponent } from './container/wait-container/wait-container.component';
import { FooterComponent } from './footer/footer.component';
import { GroupComponent } from './group/group.component';
import { WaitGroupComponent } from './group/wait-group/wait-group.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: GroupComponent},
  { path: 'groups', component: GroupComponent },
  { path: 'wait-group/:operation/:groupName', component: WaitGroupComponent},
  { path: 'accounts/:groupName', component: AccountComponent },
  { path: 'wait-account/:groupName/:operation/:accountName', component: WaitAccountComponent},
  { path: 'containers/:groupName/:accountName', component: ContainerComponent },
  { path: 'wait-container/:groupName/:accountName/:operation/:containerName', component: WaitContainerComponent},
  { path: 'blobs/:groupName/:accountName/:containerName', component: BlobComponent },
  { path: 'wait-blob/:groupName/:accountName/:containerName/:operation/:blobName', component: WaitBlobComponent},
  { path: 'all-accounts', component: AllAccountComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [GroupComponent, 
                                  WaitGroupComponent,
                                  AccountComponent, 
                                  WaitAccountComponent,
                                  ContainerComponent,
                                  WaitContainerComponent,
                                  BlobComponent,
                                  WaitBlobComponent,
                                  AllAccountComponent,
                                  NavbarComponent,
                                  FooterComponent,
                                  SidebarComponent,
                                  NotFoundComponent]
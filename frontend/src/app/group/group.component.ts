import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceGroupInfoDTO } from '../class/group/resource-group-info-dto';
import { ResourceGroupListDTO } from '../class/group/resource-group-list-dto';
import { GroupService } from './group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  // Services variable
  public groupsList: ResourceGroupListDTO;
  public groupInfo: ResourceGroupInfoDTO;

  // Two way binding variables
  public createName: string = "";
  
  constructor(private groupService: GroupService, private router: Router) {
  }

  ngOnInit(): void {
    this.groups();
  }

  create(): void {
      this.router.navigate(['wait-group', 'save' , this.createName]);
  }

  delete(groupName: string): void {
    this.router.navigate(['wait-group', 'delete' , groupName])
  }

  groups(): void {
    this.groupService.groups()
      .subscribe(data => this.groupsList = data);
  }

  info(name: string): void {
    this.groupInfo = null;
    
    this.groupService.info(name)
      .subscribe(data => this.groupInfo = data);
  }

  goToAccounts(groupName: string): void {
    this.router.navigate(['/accounts', groupName]);
  }
}

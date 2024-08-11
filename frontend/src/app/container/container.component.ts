import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ContainerInfoDTO } from '../class/container/container-info-dto';
import { ContainerListDTO } from '../class/container/container-list-dto';
import { ContainerService } from './container.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  // Services variable
  public containersList: ContainerListDTO;
  public containerInfo: ContainerInfoDTO;

  // Route variable
  public groupName: string;
  public accountName: string;

  // Two way binding variables
  public createName: string = "";  
  
  constructor(private containerService: ContainerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let group = params.get('groupName');
      this.groupName = group;

      let account = params.get('accountName');
      this.accountName = account;

      this.containers(this.groupName, this.accountName);
    });
  }

  create() {
    this.router.navigate(['wait-container', this.groupName, this.accountName, 'save' , this.createName]);
  }

  delete(containerName: string) {
    this.router.navigate(['wait-container', this.groupName, this.accountName, 'delete' , containerName]);
  }

  containers(groupName: string, accountName: string) {
    this.containerService.containers(groupName, accountName)
      .subscribe(data => this.containersList = data);
  }

  info(containerName: string) {
    this.containerInfo = null;
    
    this.containerService.info(this.groupName, this.accountName, containerName) 
      .subscribe(data => {
        this.containerInfo = data;
        
        this.containerInfo.data.lastModifiedDate = this.formatDate(this.containerInfo.data.lastModifiedDate);
      });
  }

  goToBlobs(containerName: string) {
    this.router.navigate(['/blobs', this.groupName, this.accountName, containerName]);
  }

  goToGroups() {
    this.router.navigate(['/groups']);
  }

  goToAccountsByGroup() {
    this.router.navigate(['/accounts', this.groupName]);
  }

  formatDate(date: string): string {
    let t = date.indexOf("T");
    let tCharacter = date.charAt(t);
    date = date.replace(tCharacter, " ");

    let z = date.indexOf("Z");
    let zCharacter = date.charAt(z);
    date = date.replace(zCharacter, " ");

    let time = date.lastIndexOf(":");
    date = date.substring(0, time);    

    return date;
  }
}

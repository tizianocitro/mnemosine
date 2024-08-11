import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StorageAccountInfoDTO } from '../class/account/storage-account-info-dto';
import { StorageAccountListDTO } from '../class/account/storage-account-list-dto';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  // Services variable
  public accountsList: StorageAccountListDTO;
  public accountInfo: StorageAccountInfoDTO;

  // Route variable
  public groupName: string;

  // Two way binding variables
  public createName: string = "";  

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let group = params.get('groupName');
      this.groupName = group;

      this.accounts(this.groupName);
    });
  }

  accounts(groupName: string) {
    this.accountService.accounts(groupName)
      .subscribe(data => this.accountsList = data);
  }

  create() {
    this.router.navigate(['wait-account', this.groupName, 'save' , this.createName]);
  }

  delete(accountName: string) {
    this.router.navigate(['wait-account', this.groupName, 'delete' , accountName]);
  }

  info(accountName: string) {
    this.accountInfo = null;
    
    this.accountService.info(this.groupName, accountName)
      .subscribe(data => { 
        this.accountInfo = data;
      
        this.accountInfo.data.creationDate = this.formatDate(this.accountInfo.data.creationDate);
      });
  }

  goToContainers(accountName: string) {
    this.router.navigate(['/containers', this.groupName, accountName]);
  }

  goToGroups() {
    this.router.navigate(['/groups']);
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

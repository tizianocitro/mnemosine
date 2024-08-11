import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageAccountInfoDTO } from 'src/app/class/account/storage-account-info-dto';
import { StorageAccountListDTO } from 'src/app/class/account/storage-account-list-dto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-all-account',
  templateUrl: './all-account.component.html',
  styleUrls: ['./all-account.component.css']
})
export class AllAccountComponent implements OnInit {

  // Services varibale
  public allAccountsList: StorageAccountListDTO;
  public accountInfo: StorageAccountInfoDTO;

  // Two way binding variables
  public accountCreateName: string = ""; 
  public groupCreateName: string = ""; 

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.allAccounts();
  }

  create() {
    this.router.navigate(['wait-account', this.groupCreateName, 'save' , this.accountCreateName]);
  }

  delete(groupName: string, accountName: string) {
    this.router.navigate(['wait-account', groupName, 'delete' , accountName]);
  }

  allAccounts() {
    this.accountService.allAccounts()
      .subscribe(data => this.allAccountsList = data);
  }

  info(groupName: string, accountName: string) {
    this.accountInfo = null;
    
    this.accountService.info(groupName, accountName)
      .subscribe(data => { 
        this.accountInfo = data;
      
        this.accountInfo.data.creationDate = this.formatDate(this.accountInfo.data.creationDate);
      });
  }

  goToGroups() {
    this.router.navigate(['/groups']);
  }

  goToContainers(groupName: string, accountName: string) {
    this.router.navigate(['/containers', groupName, accountName]);
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

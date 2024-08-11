import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { StorageAccountCreateDTO } from 'src/app/class/account/storage-account-create-dto';
import { StorageAccountDeleteDTO } from 'src/app/class/account/storage-account-delete-dto';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-wait-account',
  templateUrl: './wait-account.component.html',
  styleUrls: ['./wait-account.component.css']
})
export class WaitAccountComponent implements OnInit {

  // Service variable
  public createdAccount: StorageAccountCreateDTO;
  public deletedAccount: StorageAccountDeleteDTO;
  
  // Route variable
  public groupName: string;
  public accountName: string;
  public operation: string;

  // Two way binding variable
  public hasAnErrorOccurred: boolean = false;

  constructor(private accountService: AccountService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let group = params.get('groupName');
      this.groupName = group;

      let account = params.get('accountName');
      this.accountName = account;
    
      let operation = params.get('operation');
      this.operation = operation;
      
      if (operation === 'save') {
        this.accountService.create(this.groupName, this.accountName)
          .subscribe(data => {
            this.createdAccount = data 
            
            if (this.createdAccount.success == false)
              this.hasAnErrorOccurred = true;
          });
      } else if (operation === 'delete') {
          this.accountService.delete(this.groupName, this.accountName)
          .subscribe(data => this.deletedAccount = data);
      }
    });
  }

  goToAccounts() {
    this.router.navigate(['/accounts', this.groupName]);
  }
}

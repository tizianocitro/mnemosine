import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ResourceGroupCreateDTO } from 'src/app/class/group/resource-group-create-dto';
import { ResourceGroupDeleteDTO } from 'src/app/class/group/resource-group-delete-dto';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-wait-group',
  templateUrl: './wait-group.component.html',
  styleUrls: ['./wait-group.component.css']
})
export class WaitGroupComponent implements OnInit {

  // Services variable
  public createdGroup: ResourceGroupCreateDTO;
  public deletedGroup: ResourceGroupDeleteDTO;
  
  // Route variable
  public groupName: string;
  public operation: string;

  // Two way binding variable
  public hasAnErrorOccurred: boolean = false;

  constructor(private groupService: GroupService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let group = params.get('groupName');
      this.groupName = group;
      
      let operation = params.get('operation');
      this.operation = operation;
      
      if (operation === 'save') {
        this.groupService.create(this.groupName)
          .subscribe(data => { 
            this.createdGroup = data
          
            if (this.createdGroup.success == false)
              this.hasAnErrorOccurred = true;
          });
      } else if (operation === 'delete') {
          this.groupService.delete(this.groupName)
          .subscribe(data => this.deletedGroup = data);
      }
    });
  }

  goToGroups() {
    this.router.navigate(['/groups']);
  }
}

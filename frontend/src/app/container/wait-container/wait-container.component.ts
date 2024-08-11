import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ContainerCreateDTO } from 'src/app/class/container/container-create-dto';
import { ContainerDeleteDTO } from 'src/app/class/container/container-delete-dto';
import { ContainerService } from '../container.service';

@Component({
  selector: 'app-wait-container',
  templateUrl: './wait-container.component.html',
  styleUrls: ['./wait-container.component.css']
})
export class WaitContainerComponent implements OnInit {

  // Service variable
  public createdContainer: ContainerCreateDTO;
  public deletedContainer: ContainerDeleteDTO;
    
  // Route variable
  public groupName: string;
  public accountName: string;
  public containerName: string;
  public operation: string;
  
  // Two way binding variable
  public hasAnErrorOccurred: boolean = false;

  constructor(private containerService: ContainerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let group = params.get('groupName');
      this.groupName = group;

      let account = params.get('accountName');
      this.accountName = account;

      let container = params.get('containerName');
      this.containerName = container;
    
      let operation = params.get('operation');
      this.operation = operation;
      
      if (operation === 'save') {
        this.containerService.create(this.groupName, this.accountName, this.containerName)
          .subscribe(data => { this.createdContainer = data
          
            if (this.createdContainer.success == false)
              this.hasAnErrorOccurred = true;
          });
      } else if (operation === 'delete') {
          this.containerService.delete(this.groupName, this.accountName, this.containerName)
          .subscribe(data => this.deletedContainer = data);
      }
    });
  }

  goToContainers() {
    this.router.navigate(['/containers', this.groupName, this.accountName]);
  }
}

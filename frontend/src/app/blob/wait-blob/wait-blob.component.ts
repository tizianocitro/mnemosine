import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BlobDeleteDTO } from 'src/app/class/blob/blob-delete-dto';
import { BlobInfoDTO } from 'src/app/class/blob/blob-info-dto';
import { BlobUploadDTO } from 'src/app/class/blob/blob-upload-dto';
import { BlobService } from '../blob.service';

@Component({
  selector: 'app-wait-blob',
  templateUrl: './wait-blob.component.html',
  styleUrls: ['./wait-blob.component.css']
})
export class WaitBlobComponent implements OnInit {

  // Service variable
  public uploadedBlob: BlobUploadDTO;
  public deletedBlob: BlobDeleteDTO;
  public renameBlob: BlobInfoDTO;
  public copiedBlob: BlobInfoDTO;

  // Shared variable
  public formData: FormData;
  public renameName: string;

  // Route variable
  public groupName: string;
  public accountName: string;
  public containerName: string;
  public blobName: string;
  public operation: string;

  // Two way binding variable
  public hasAnErrorOccurred: boolean = false;

  constructor(private blobService: BlobService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let group = params.get('groupName');
      this.groupName = group;

      let account = params.get('accountName');
      this.accountName = account;

      let container = params.get('containerName');
      this.containerName = container;
    
      let blob = params.get('blobName');
      this.blobName = blob;

      let operation = params.get('operation');
      this.operation = operation;
      
      if (operation === 'upload') {
        this.formData = this.blobService.getFormData();
        
        this.blobService.upload(this.groupName, this.accountName, this.containerName, this.formData)
          .subscribe(data => this.uploadedBlob = data);
      } else if (operation === 'delete') {
          this.blobService.delete(this.groupName, this.accountName, this.containerName, this.blobName)
          .subscribe(data => this.deletedBlob = data);
      } else if (operation === 'rename') {
        this.renameName = this.blobService.getRenameName();

        this.blobService.rename(this.groupName, this.accountName, this.containerName, this.blobName, this.renameName)
          .subscribe(data => {
            this.renameBlob = data;
          
            if (this.renameBlob.success == false)
              this.hasAnErrorOccurred = true;
          });
      } else if (operation === 'copy') {
        this.blobService.copy(this.groupName, this.accountName, this.containerName, this.blobName)
          .subscribe(data => this.copiedBlob = data);
      }
    });
  }

  goToBlobs() {
    this.router.navigate(['/blobs', this.groupName, this.accountName, this.containerName]);
  }
}

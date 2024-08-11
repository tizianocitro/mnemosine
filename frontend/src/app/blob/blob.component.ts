import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BlobInfoDTO } from '../class/blob/blob-info-dto';
import { BlobListDTO } from '../class/blob/blob-list-dto';
import { baseUrl, clientId, secret, subscriptionId, tenantId } from '../consts/consts';
import { BlobService } from './blob.service';

@Component({
  selector: 'app-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.css']
})
export class BlobComponent implements OnInit {

  // Services variable
  public blobsList: BlobListDTO;
  public blobInfo: BlobInfoDTO;

  // Route variable
  public groupName: string;
  public accountName: string;
  public containerName: string;

  // Download variable
  public selectedFile: File;
  public serviceUrl: string = baseUrl + "blob/download";
  public clientId: string = clientId;
  public tenantId: string = tenantId;
  public subscriptionId: string = subscriptionId;
  public secret: string = secret;

  // Two way binding variable
  public fileInputText: string = "Scegli il file da caricare";
  public fileFormat: string;
  public renameName: string;
  public oldBlobName:string;

  constructor(private blobService: BlobService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let group = params.get('groupName');
      this.groupName = group;

      let account = params.get('accountName');
      this.accountName = account;

      let container = params.get('containerName');
      this.containerName = container;

      this.blobs(this.groupName, this.accountName, this.containerName);
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

    this.fileInputText = this.selectedFile.name;
  }

  upload() {
    let formData: FormData = new FormData();
    formData.append("file_to_upload", this.selectedFile, this.selectedFile.name);

    // Set shared form data
    this.blobService.setFormData(formData);

    this.router.navigate(['wait-blob', this.groupName, this.accountName, this.containerName, 'upload', this.selectedFile.name]);
  }

  delete(blobName: string) {
    this.router.navigate(['wait-blob', this.groupName, this.accountName, this.containerName, 'delete', blobName]);
  }

  blobs(groupName: string, accountName: string, containerName: string) {
    this.blobService.blobs(groupName, accountName, containerName)
      .subscribe(data => this.blobsList = data);
  }

  setOldBlobName(oldBlobName: string) {
    this.oldBlobName = oldBlobName;
  }

  rename() {
    this.blobService.setRenameName(this.renameName);

    this.router.navigate(['wait-blob', this.groupName, this.accountName, this.containerName, 'rename', this.oldBlobName]);
  }

  copy(blobName: string) {
    this.router.navigate(['wait-blob', this.groupName, this.accountName, this.containerName, 'copy', blobName]);
  }

  info(blobName: string) {
    this.blobInfo = null;

    this.blobService.info(this.groupName, this.accountName, this.containerName, blobName)
      .subscribe(data => {
        this.blobInfo = data;
      
        this.fileFormat = this.blobInfo.data.blobName
          .substring(this.blobInfo.data.blobName.lastIndexOf(".") + 1);

        this.blobInfo.data.creationDate = this.formatDate(this.blobInfo.data.creationDate);
        this.blobInfo.data.lastModifiedDate = this.formatDate(this.blobInfo.data.lastModifiedDate);

        this.blobInfo.data.size = this.formatSize(this.blobInfo.data.size);
      });
  }

  goToGroups() {
    this.router.navigate(['/groups']);
  }

  goToAccountsByGroup() {
    this.router.navigate(['/accounts', this.groupName]);
  }

  goToContainers() {
    this.router.navigate(['/containers', this.groupName, this.accountName]);
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

  formatSize(size: string): string {
    let sizeNumber = Number(size);

    return Math.round(sizeNumber / 1000) + " KB";
  }
}

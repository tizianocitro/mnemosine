import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlobDeleteDTO } from '../class/blob/blob-delete-dto';
import { BlobInfoDTO } from '../class/blob/blob-info-dto';
import { BlobListDTO } from '../class/blob/blob-list-dto';
import { BlobUploadDTO } from '../class/blob/blob-upload-dto';
import { baseUrl, clientId, tenantId, secret, subscriptionId } from '../consts/consts';

@Injectable({
  providedIn: 'root'
})
export class BlobService {

  // Shared variable
  public sharedFormData: FormData;
  public renameName: string;

  constructor(private http: HttpClient) { }

  upload(groupName: string, accountName: string, containerName: string, formData: FormData): Observable<BlobUploadDTO> {
    let uploadUrl = baseUrl + "blob/upload";

    // Build Form Data
    formData.append("client_id", clientId);
    formData.append("tenant_id", tenantId);
    formData.append("secret", secret);
    formData.append("subscription_id", subscriptionId);
    formData.append("group_name", groupName);
    formData.append("account_name", accountName);
    formData.append("container_name", containerName);
                
    return this.http.post<BlobUploadDTO>(uploadUrl, formData);
  }

  delete(groupName: string, accountName: string, containerName: string, blobName: string): Observable<BlobDeleteDTO> {
    let deleteUrl = baseUrl + "blob/delete";
    let body = {clientId: clientId, 
                tenantId: tenantId,
                secret: secret,
                subscriptionId: subscriptionId,
                groupName: groupName,
                accountName: accountName,
                containerName: containerName,
                blobName: blobName};

    return this.http.request<BlobDeleteDTO>('delete', deleteUrl, {body});
  }

  blobs(groupName: string, accountName: string, containerName: string): Observable<BlobListDTO> {
    let blobsUrl = baseUrl + "blob/blobs";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId)
      .set("group_name", groupName)
      .set("account_name", accountName)
      .set("container_name", containerName);

    return this.http.get<BlobListDTO>(blobsUrl, {params: params});
  }

  rename(groupName: string, accountName: string, containerName: string, blobOldName: string, blobNewName: string): Observable<BlobInfoDTO> {
    let renameUrl = baseUrl + "blob/rename";
    let body = {clientId: clientId, 
      tenantId: tenantId,
      secret: secret,
      subscriptionId: subscriptionId,
      groupName: groupName,
      accountName: accountName,
      containerName: containerName,
      blobOldName: blobOldName,
      blobNewName: blobNewName};
                
    return this.http.put<BlobInfoDTO>(renameUrl, body);
  }

  copy(groupName: string, accountName: string, containerName: string, blobName: string): Observable<BlobInfoDTO> {
    let copyUrl = baseUrl + "blob/copy";
    let body = {clientId: clientId, 
      tenantId: tenantId,
      secret: secret,
      subscriptionId: subscriptionId,
      groupName: groupName,
      accountName: accountName,
      containerName: containerName,
      blobName: blobName};
                
    return this.http.post<BlobInfoDTO>(copyUrl, body);
  }

  info(groupName: string, accountName: string, containerName: string, blobName: string): Observable<BlobInfoDTO> {
    let infoUrl = baseUrl + "blob/info";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId)
      .set("group_name", groupName)
      .set("account_name", accountName)
      .set("container_name", containerName)
      .set("blob_name", blobName);

    return this.http.get<BlobInfoDTO>(infoUrl, {params: params});
  }

  setFormData(formData: FormData) {
    this.sharedFormData = formData;
  }

  getFormData(): FormData {
    return this.sharedFormData;
  }

  setRenameName(renameName: string) {
    this.renameName = renameName;
  }

  getRenameName(): string {
    return this.renameName;
  }
}

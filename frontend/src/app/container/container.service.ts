import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerCreateDTO } from '../class/container/container-create-dto';
import { ContainerDeleteDTO } from '../class/container/container-delete-dto';
import { ContainerInfoDTO } from '../class/container/container-info-dto';
import { ContainerListDTO } from '../class/container/container-list-dto';
import { baseUrl, clientId, secret, subscriptionId, tenantId } from '../consts/consts';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private http: HttpClient) { }

  create(groupName: string, accountName: string, containerName: string): Observable<ContainerCreateDTO> {
    let createUrl = baseUrl + "container/create";
    let body = {clientId: clientId, 
                tenantId: tenantId,
                secret: secret,
                subscriptionId: subscriptionId,
                groupName: groupName,
                accountName: accountName,
                containerName: containerName};

    return this.http.post<ContainerCreateDTO>(createUrl, body);
  }

  delete(groupName: string, accountName: string, containerName: string): Observable<ContainerDeleteDTO> {
    let deleteUrl = baseUrl + "container/delete";
    let body = {clientId: clientId, 
                tenantId: tenantId,
                secret: secret,
                subscriptionId: subscriptionId,
                groupName: groupName,
                accountName: accountName,
                containerName: containerName};

    return this.http.request<ContainerDeleteDTO>('delete', deleteUrl, {body});
  }

  containers(groupName: string, accountName: string): Observable<ContainerListDTO> {
    let containersUrl = baseUrl + "container/containers-by-account";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId)
      .set("group_name", groupName)
      .set("account_name", accountName);

    return this.http.get<ContainerListDTO>(containersUrl, {params: params});
  }

  info(groupName: string, accountName: string, containerName: string): Observable<ContainerInfoDTO> {
    let infoUrl = baseUrl + "container/info";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId)
      .set("group_name", groupName)
      .set("account_name", accountName)
      .set("container_name", containerName);

    return this.http.get<ContainerInfoDTO>(infoUrl, {params: params});
  }
}

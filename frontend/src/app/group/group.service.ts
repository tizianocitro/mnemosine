import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceGroupCreateDTO } from '../class/group/resource-group-create-dto';
import { ResourceGroupDeleteDTO } from '../class/group/resource-group-delete-dto';
import { ResourceGroupInfoDTO } from '../class/group/resource-group-info-dto';
import { ResourceGroupListDTO } from '../class/group/resource-group-list-dto';
import { baseUrl, clientId, secret, subscriptionId, tenantId } from '../consts/consts';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  
  constructor(private http: HttpClient) { }

  create(name: string): Observable<ResourceGroupCreateDTO> {
    let createUrl = baseUrl + "group/create";
    let body = {clientId: clientId, 
                tenantId: tenantId,
                secret: secret,
                subscriptionId: subscriptionId,
                groupName: name};

    return this.http.post<ResourceGroupCreateDTO>(createUrl, body);
  }

  delete(name: string): Observable<ResourceGroupDeleteDTO> {
    let deleteUrl = baseUrl + "group/delete";
    let body = {clientId: clientId, 
                tenantId: tenantId,
                secret: secret,
                subscriptionId: subscriptionId,
                groupName: name};

    return this.http.request<ResourceGroupDeleteDTO>('delete', deleteUrl, {body});
  }

  groups(): Observable<ResourceGroupListDTO> {
    let groupsUrl = baseUrl + "group/groups";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId);

    return this.http.get<ResourceGroupListDTO>(groupsUrl, {params: params});
  }

  info(name: string): Observable<ResourceGroupInfoDTO> {
    let infoUrl = baseUrl + "group/info";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId)
      .set("group_name", name);

    return this.http.get<ResourceGroupInfoDTO>(infoUrl, {params: params});
  }
}

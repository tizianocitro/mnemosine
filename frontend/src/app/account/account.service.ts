import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageAccountCreateDTO } from '../class/account/storage-account-create-dto';
import { StorageAccountDeleteDTO } from '../class/account/storage-account-delete-dto';
import { StorageAccountInfoDTO } from '../class/account/storage-account-info-dto';
import { StorageAccountListDTO } from '../class/account/storage-account-list-dto';
import { baseUrl, clientId, secret, subscriptionId, tenantId } from '../consts/consts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  create(groupName: string, accountName: string): Observable<StorageAccountCreateDTO> {
    let createUrl = baseUrl + "account/create";
    let body = {clientId: clientId, 
                tenantId: tenantId,
                secret: secret,
                subscriptionId: subscriptionId,
                groupName: groupName,
                accountName: accountName};

    return this.http.post<StorageAccountCreateDTO>(createUrl, body);
  }

  delete(groupName: string, accountName: string): Observable<StorageAccountDeleteDTO> {
    let deleteUrl = baseUrl + "account/delete";
    let body = {clientId: clientId, 
                tenantId: tenantId,
                secret: secret,
                subscriptionId: subscriptionId,
                groupName: groupName,
                accountName: accountName};

    return this.http.request<StorageAccountDeleteDTO>('delete', deleteUrl, {body});
  }

  accounts(groupName: string): Observable<StorageAccountListDTO> {
    let accountsUrl = baseUrl + "account/accounts-by-group";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId)
      .set("group_name", groupName);

    return this.http.get<StorageAccountListDTO>(accountsUrl, {params: params});
  }

  allAccounts(): Observable<StorageAccountListDTO> {
    let accountsUrl = baseUrl + "account/all-accounts";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId);

      return this.http.get<StorageAccountListDTO>(accountsUrl, {params: params});
  }

  info(groupName: string, accountName: string): Observable<StorageAccountInfoDTO> {
    let infoUrl = baseUrl + "account/info";
    let params = new HttpParams()
      .set("client_id", clientId)
      .set("tenant_id", tenantId)
      .set("secret", secret)
      .set("subscription_id", subscriptionId)
      .set("group_name", groupName)
      .set("account_name", accountName);

    return this.http.get<StorageAccountInfoDTO>(infoUrl, {params: params});
  }
}

import { StorageAccountList } from "./storage-account-list";

export class StorageAccountListDTO {
    code: string;
    success: boolean;
    message: string;
    data: StorageAccountList;
}

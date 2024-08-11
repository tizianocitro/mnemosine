import { StorageAccountDelete } from "./storage-account-delete";

export class StorageAccountDeleteDTO {
    code: string;
    success: boolean;
    message: string;
    data: StorageAccountDelete;
}
import { StorageAccountCreate } from "./storage-account-create";

export class StorageAccountCreateDTO {
    code: string;
    success: boolean;
    message: string;
    data: StorageAccountCreate;
}
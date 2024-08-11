import { StorageAccountInfo } from "./storage-account-info";

export class StorageAccountInfoDTO {
    code: string;
    success: boolean;
    message: string;
    data: StorageAccountInfo;
}
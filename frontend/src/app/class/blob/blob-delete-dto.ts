import { BlobDelete } from "./blob-delete";

export class BlobDeleteDTO {
    code: string;
    success: boolean;
    message: string;
    data: BlobDelete;
}
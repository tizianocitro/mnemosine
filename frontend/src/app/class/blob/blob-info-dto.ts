import { BlobInfo } from "./blob-info";

export class BlobInfoDTO {
    code: string;
    success: boolean;
    message: string;
    data: BlobInfo;
}
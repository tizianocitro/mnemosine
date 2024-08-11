import { BlobUpload } from "./blob-upload";

export class BlobUploadDTO {
    code: string;
    success: boolean;
    message: string;
    data: BlobUpload;
}
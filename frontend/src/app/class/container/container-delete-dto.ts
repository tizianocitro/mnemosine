import { ContainerDelete } from "./container-delete";

export class ContainerDeleteDTO {
    code: string;
    success: boolean;
    message: string;
    data: ContainerDelete;
}
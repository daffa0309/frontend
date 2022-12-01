export interface Menu {
    id: number;
    parentId: number;
    siteId: number;
    value: number;
    name: string;
    url: string;
    urlView: string;
    createdAt: Date;
    updatedAt: Date;
}
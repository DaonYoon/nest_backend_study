export interface Board {
    id: string;
    title: string;
    status: BoardStatus
    description: string;
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}
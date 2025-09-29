export enum TicketStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Done = "Done",
}
export type Ticket = {
    id: number;
    title: string;
    status: TicketStatus;
    author: string;
};

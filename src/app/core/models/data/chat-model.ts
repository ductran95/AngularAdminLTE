
export class ChatModel {
    id: number;
    content: string;
    timeSend: Date;
    user: {
        id?: number;
        name?: string;
        type: 'you' | 'me';
    };
}

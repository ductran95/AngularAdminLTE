export class PopupOption {
    public constructor(init?:Partial<PopupOption>) {
        Object.assign(this, init);
    }

    type: string;
    title: string;
    cancelText: string;
    okText: string;
}

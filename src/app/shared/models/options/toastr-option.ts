export class ToastrOption implements ToastrOptions{
    public constructor(init?:Partial<ToastrOption>) {
        Object.assign(this, init);
    }

    escapeHtml: boolean;
    closeButton: boolean;
    progressBar: boolean;
    positionClass: string;
    preventDuplicates: boolean;
    onclick: any;
    newestOnTop: boolean;
    showDuration: number;
    hideDuration: number;
    extendedTimeOut: number;
    showEasing: string;
    hideEasing: string;
    showMethod: string;
    hideMethod: string;
}

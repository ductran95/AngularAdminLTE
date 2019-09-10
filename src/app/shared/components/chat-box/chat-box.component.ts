import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewChecked, AfterViewInit, OnChanges, AfterContentInit } from '@angular/core';
import { appConstants } from '@app/core/constants/appConstants';
import { NgForm } from '@angular/forms';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { ChatModel } from '@app/core/models/chat-model';

@Component({
    selector: 'common-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, OnChanges {

    //#region Inputs, Outputs

    @Input() messageList: ChatModel[];
    // @Input() messageList$: Observable<CommentModel[]>;
    @Input() actions: ('Send' | 'Edit' | 'Delete')[];

    @Output() sendClick: EventEmitter<any> = new EventEmitter();
    @Output() leftClick: EventEmitter<any> = new EventEmitter();
    @Output() editClick: EventEmitter<any> = new EventEmitter();
    @Output() deleteClick: EventEmitter<any> = new EventEmitter();

    //#endregion

    //#region Properties

    appConstant = appConstants;

    messageText: string;
    message: ChatModel;

    @ViewChild(ContextMenuComponent, null) basicMenu: ContextMenuComponent;
    @ViewChild(VirtualScrollerComponent, null) virtualScroll: VirtualScrollerComponent;

    protected hasSend = false;
    protected hasEdit = false;
    protected hasDelete = false;

    //#endregion

    //#region Constructors

    constructor() { }

    //#endregion

    //#region OnInit

    ngOnInit() {
        this.messageText = null;
        this.message = null;
        this.hasSend = this.actions.includes('Send');
        this.hasEdit = this.actions.includes('Edit');
        this.hasDelete = this.actions.includes('Delete');
    }

    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        for (const prop in changes) {
            if (prop == 'messageList') {
                // tslint:disable-next-line: no-string-literal
                if (this.virtualScroll && this.virtualScroll['containerElementRef']) {
                    // Scroll to bottom
                    this.scrollToBottom();
                } else {
                    setTimeout(() => {
                        this.scrollToBottom();
                    }, 1000);
                }
            }
        }
    }

    //#endregion

    //#region Funtions

    scrollToBottom() {
        this.virtualScroll.scrollToIndex(this.messageList.length - 1);
    }

    setZIndex() {
        const zindex = Number($('.modal.fade.in').css('z-index'));
        $('.cdk-overlay-container').css('z-index', zindex + 1);
    }

    onChatFormSubmit(chatForm: NgForm) {
        if (chatForm.valid) {
            if (!this.message && this.hasSend) {
                this.sendClick.emit(this.messageText);
            } else if (this.hasEdit) {
                this.message.content = this.messageText;
                this.editClick.emit(this.message);
                this.message = null;
            }
            this.messageText = null;
        }
    }

    showUpdateChat(message) {
        this.message = message;
        this.messageText = this.message.content;
    }

    onDeleteChat(message) {
        this.message = message;
        this.deleteClick.emit(this.message);
    }

    //#endregion
}

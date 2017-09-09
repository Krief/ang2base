import { Component, HostListener, ViewChild, OnInit, Inject, ViewContainerRef } from '@angular/core';


@Component({
    selector: 'dndresource-app',
    template: `
    <div>
        <router-outlet></router-outlet>
    </div>
    `
})

export class AppComponent implements OnInit {
    @ViewChild('hoeHeader') hoeHeader;
    contentHeight: number;
    minmizeSidebar: boolean = false;

    constructor(
        private viewContainerRef: ViewContainerRef,
        @Inject(Window) private window: Window
    ) {
    }
    ngOnInit() {
        this.onResize();
    }



    // TODO - can we directly bind this and not catch any resize events? Angular binding
    // probably wouldn't happen without event (similar to scroll)
    @HostListener('window:resize')
    onResize() {
        if (this.hoeHeader) {
            const headerHeight = this.hoeHeader.nativeElement.offsetHeight;
            const windowHeight = this.window.innerHeight;
            this.contentHeight = windowHeight - headerHeight;
        }
    }
}

import { Directive, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
selector:'[red]',
standalone:true,

})

export class RedDirective {
    backgroundColor = 'transparent';

    @HostBinding('style.backgroundColor')
    get backgroundcolor(){
        return this.backgroundColor;
    }

    @HostListener('mouseenter')
    enter(){
        this.backgroundColor = 'yellow';
    }

    @HostListener('mouseleave')
    leave(){
        this.backgroundColor = 'transparent';
    }
}
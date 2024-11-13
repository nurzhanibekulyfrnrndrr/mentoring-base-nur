import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[shadow]',
    standalone:true,
})

export class HighlightDirective{
    boxshadow = '';

    @HostBinding('style.boxShadow')
    get  boxShadow(){
        return this.boxshadow;
    }

    @HostListener('mouseenter')
    enter(){
        this.boxshadow = '0px 4px 8px rgba(0, 0, 0, 0.5)';
    }

    @HostListener('mouseleave')
    leave(){
        this.boxshadow = '';
    }
}


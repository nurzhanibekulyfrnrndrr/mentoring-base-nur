import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name:'truncate',
standalone:true,
})
export class TrunCatePipe  implements PipeTransform{
    transform(text:string, limit:number =20) {
        return text.length > limit? text.substring(0,limit) + '...' : text;
    }

}
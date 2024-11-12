import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'removeDashes',
    standalone:true,

})

export class RemoveDashesPipe implements PipeTransform{
transform(value: string): string {
    // Используем регулярное выражение для замены всех черточек на пустую строку
    return value.replace(/-/g, '');
  }

}
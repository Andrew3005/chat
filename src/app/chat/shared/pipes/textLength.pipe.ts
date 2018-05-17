import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'textLength'
})
export class textLengthPipe implements PipeTransform{
    transform(text : string): string{
        if(text.length > 40){
            text = text.substring(0,40);
            text = text + '...';
        }
        return text;
    }
}
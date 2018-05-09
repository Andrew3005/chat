import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'APPFilter'
})
export class FilterPipe implements PipeTransform{
    transform(items: any, value: string, field: string): any{
        if(items.length == 0 || !value){
            return items;
        }

        return items.filter((i) => {
            const t = Object.assign({}, i);

            if (field === 'name') {
                t[field] = t['name'];
            }

            if (field === 'position') {
                t[field] = t['position'];
            }

            return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        })
    }
}
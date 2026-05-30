import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  standalone: false,
})
export class SearchFilterPipe implements PipeTransform {
   transform(employees: any[], searchText: string): any[] {
    if (!employees || !searchText) {
      return employees;
    }
    searchText = searchText.toLowerCase();
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(searchText) ||
      employee.department.toLowerCase().includes(searchText)
    );

  }
}

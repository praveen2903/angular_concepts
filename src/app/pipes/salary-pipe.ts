import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salary',
  standalone: false,
})
export class SalaryPipe implements PipeTransform {
  transform(value: number): String {
    if (value >= 80000) {
      return 'High Salary';
    }

    if (value >= 50000) {
      return 'Medium Salary';
    }

    return 'Low Salary';
  }
  
}

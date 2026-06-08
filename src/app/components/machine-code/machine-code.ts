import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-machine-code',
  standalone: false,
  templateUrl: './machine-code.html',
  styleUrl: './machine-code.css',
})
export class MachineCode {
   stars = [1,2,3,4,5];
   clickedIndex = 0
   rateStars (star:number){
    this.clickedIndex= star;
   }

rating = 0;
hoverRating = 0;

ratingStars(star:number){
  this.rating = star;
}

hoverStars(star:number){
  this.hoverRating = star;
}

starRating = 0;
hoverStarRating =0;

selectRating(event: MouseEvent, star: number) {
  const element = event.target as HTMLElement;
  const rect = element.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = clickX / rect.width;
  const fractionalRating = Math.round(percentage * 10) / 10;
  this.starRating = Number((star - 1 + fractionalRating).toFixed(1));
}

hoverSelectRating(event: MouseEvent, star: number) {
  const element = event.target as HTMLElement;
  const rect = element.getBoundingClientRect()
  const clickX= event.clientX - rect.left;
  const percentage = clickX/ rect.width;
  this.hoverStarRating = Number((star-1+ percentage).toFixed(1));
}
getFill(star:number){
  const currentRating = this.hoverStarRating || this.starRating;
  const diff = currentRating - (star - 1);
  if(diff >= 1){
    return 100;
  }
  if(diff <= 0){
    return 0;
  }
  return diff * 100;
}
fractionTs = `starRating = 0;
hoverStarRating =0;

selectRating(event: MouseEvent, star: number) {
  const element = event.target as HTMLElement;
  const rect = element.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = clickX / rect.width;
  const fractionalRating = Math.round(percentage * 10) / 10;
  this.starRating = Number((star - 1 + fractionalRating).toFixed(1));
}

hoverSelectRating(event: MouseEvent, star: number) {
  const element = event.target as HTMLElement;
  const rect = element.getBoundingClientRect()
  const clickX= event.clientX - rect.left;
  const percentage = clickX/ rect.width;
  this.hoverStarRating = Number((star-1+ percentage).toFixed(1));
}
getFill(star:number){
  const currentRating = this.hoverStarRating || this.starRating;
  const diff = currentRating - (star - 1);
  if(diff >= 1){
    return 100;
  }
  if(diff <= 0){
    return 0;
  }
  return diff * 100;
}`
fractionCode = `.circle-wrapper{
  position:relative;
  width:50px;
  height:50px;
  margin:5px;
  border-radius:50%;
  overflow:hidden;      /* Important */
}
.circle-base{
  position:absolute;
  inset:0;
  background:#ddd;
  border-radius:50%;
}
.circle-fill{
  position:absolute;
  left:0;
  top:0;
  height:100%;
  width:0%;
  transition:width .2s ease;
}
.circle-fill.hover-fill{
  background:black;
}
.circle-fill.active-fill{
  background:gold;
}
  

<div style="display: flex; align-items: center; justify-content: center;">
   <div *ngFor="let star of stars" class="circle-wrapper" (click)="selectRating($event, star)" (mouseenter)="hoverSelectRating($event, star)" (mouseleave)="hoverStarRating = 0">
  <span class="circle-base"></span>
  <span class="circle-fill" [style.width.%]="getFill(star)" [style.background]="hoverStarRating > 0 ? 'black': 'gold'"></span>
</div>
</div>`
hoveredCode = `stars = [1,2,3,4,5]
rating = 0;
hoverRating = 0;
ratingStars(star:number){
  this.rating = star;
}
hoverStars(star:number){
  this.hoverRating = star;
}`
hoveredHtml = `.star{
  height: 50px;
  width: 50px;
  border-radius: 50px;  // same style things written in class
  color:gray;
  cursor:pointer;
}
.active{
  color:gold;
}
.hover{
  color: blue;
}

<div style="display:flex; align-items:center; justify-content: center;">
  <div *ngFor="let star of stars" (click)="ratingStars(star)" (mouseenter)="hoverStars(star)" (mouseleave)="hoverRating=0">
  --style binding--
     <span class="star" [class.active]="star <= (hoverRating || rating)" [style.height.px]="100" [style.width.px]="100" [style.border-radius.%]="50" [style.display]="'flex'"></span>
  -- giving whole that in class better to use in interviews---
     <span class="star" [class.active]="star <= rating" [class.hover]="star<=hoverRating"></span>
  </div>
</div>`
   clickedCode = `<div style="display: flex; align-items: center; justify-content: center;">
  <div *ngFor="let star of stars" (click)="rateStars(star)">
      <span [style.background]="star<=clickedIndex ? 'gold' :'gray'" 
      style="height: 50px; width: 50px; border-radius: 50%; display: flex;"></span>
  </div>
</div>
<span>Rating: {{clickedIndex}}</span>`
clickedTs = `stars = [1,2,3,4,5];
clickedIndex = 0
rateStars (star:number){
  this.clickedIndex= star;
}`
}

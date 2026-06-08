import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-machine-code',
  standalone: false,
  templateUrl: './machine-code.html',
  styleUrl: './machine-code.css',
})
export class MachineCode {
   stars:number[] = [1,2,3,4,5];
   clickedIndex = 0;
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
fractionTs = `stars=[1,2,3,4,5]
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
}`;


users = ['john', 'peter', 'praveen', 'david', 'sam','sai', 'eren', 'mikasa', 'rokkam'];
searchText = '';

filteredUsers(){
  return this.users.filter(user=>user.toLowerCase().includes(this.searchText.toLowerCase()))
}

searchTs = `users = ['john', 'peter', 'praveen', 'david', 'sam','sai', 'eren', 'mikasa', 'rokkam'];
searchText = '';

filteredUsers(){
  return this.users.filter(user=>user.toLowerCase().includes(this.searchText.toLowerCase()))
}`;
searchCode = `<input [(ngModel)]="searchText" placeholder="search ..."  />
<ul>
  <li *ngFor="let user of filteredUsers()">
    {{user}}
  </li>
</ul>`

todos : string[] =[];
task: string='';
editIndex : number|null =null;

addTask(){
  if(!this.task.trim()) return ;
  if(this.editIndex !== null){
    this.todos[this.editIndex]=this.task;
    this.editIndex=null;
  } else{
    this.todos.push(this.task)
  }
  this.task = '';
}
deleteTask(index: number) {
  this.todos.splice(index, 1);
  if(this.editIndex === index){
    this.editIndex=null;
    this.task='';
  }
}
updateTask(index:number){
  this.task = this.todos[index]
  this.editIndex= index;
}
todobasicCode = `todos : string[] =[];
task: string='';
editIndex : number|null =null;

addTask(){
  if(!this.task.trim()) return ;
  if(this.editIndex !== null){
    this.todos[this.editIndex]=this.task;
    this.editIndex=null;
  } else{
    this.todos.push(this.task)
  }
  this.task = '';
}
deleteTask(index: number) {
  this.todos.splice(index, 1);
  if(this.editIndex === index){
    this.editIndex=null;
    this.task='';
  }
}
updateTask(index:number){
  this.task = this.todos[index]
  this.editIndex= index;
}`;
todoBasicHtml = `<input type=" 'text" [(ngModel)]="task"/>
<button (click)="addTask()">
  {{editIndex !== null ? 'Update': 'Add'}}
</button>
<ul>
  <li *ngFor="let todo of todos; let i = index">
    {{todo}}
    <button (click)="updateTask(i)">Edit</button>
    <button (click)="deleteTask(i)">delete</button>
  </li>
</ul>`;

taskItem : string = '';
todoList:string[] = ['angular', 'react'];
updateIndex: number |null = null;
updatingTask = '';

addTodoTask(){
  if(!this.taskItem.trim()) return;
  this.todoList.push(this.taskItem);
  this.taskItem='';
}
deleteTodoTask(index:number){
  this.todoList.splice(index,1);
}
startEdit(index:number){
  this.updateIndex=index;
  this.updatingTask =this.todoList[index];
}
saveEdit(index:number){
  if(!this.updatingTask.trim()) return;
  this.todoList[index] = this.updatingTask;
  this.updateIndex=null;
  this.updatingTask ='';
}

cancelEdit(){
  this.updateIndex= null;
  this.updatingTask= '';
}

draggedIndex :number|null = null;
onDragStart(index:number){
  this.draggedIndex = index;
}
onDrop(targetIndex: number){
  if(this.draggedIndex === null) return;
  const draggedItem = this.todoList[this.draggedIndex];
  this.todoList.splice(this.draggedIndex, 1);
  this.todoList.splice(targetIndex, 0, draggedItem);
  this.draggedIndex=null;
}
todoHtml = `<div style="display: flex; gap: 20px;">
  <input type="text" [(ngModel)]="taskItem" (keyup.enter)="addTodoTask()" placeholder="Enter..."/>
  <button (click)="addTodoTask()">Add </button>
</div>
<ul>
  <li *ngFor="let list of todoList; let i = index">
    <ng-container *ngIf="updateIndex!==i; else editMode"> 
      {{list}}
      <button (click)="startEdit(i)">Edit</button>
      <button (click)="deleteTodoTask(i)">Delete</button>
    </ng-container>
    <!-- //else must in ng-template only; else it gives error-->
    <ng-template #editMode>
      <div style="display: flex; gap: 20px;">  
        <input type="text" [(ngModel)]="updatingTask" placeholder="Edit.." (keyup.enter)="saveEdit(i)"/>
        <button (click)="saveEdit(i)">save</button>
        <button (click)="cancelEdit()">Cancel</button>
      </div>
    </ng-template>
  </li>
</ul>`

todoTs=`taskItem : string = '';
todoList:string[] = ['angular', 'react'];
updateIndex: number |null = null;
updatingTask = '';

addTodoTask(){
  if(!this.taskItem.trim()) return;
  this.todoList.push(this.taskItem);
  this.taskItem='';
}
deleteTodoTask(index:number){
  this.todoList.splice(index,1);
}
startEdit(index:number){
  this.updateIndex=index;
  this.updatingTask =this.todoList[index];
}
saveEdit(index:number){
  if(!this.updatingTask.trim()) return;
  this.todoList[index] = this.updatingTask;
  this.updateIndex=null;
  this.updatingTask ='';
}

cancelEdit(){
  this.updateIndex= null;
  this.updatingTask= '';
}
`

todoDragTs = `taskItem : string = '';
todoList:string[] = ['angular', 'react'];
updateIndex: number |null = null;
updatingTask = '';

addTodoTask(){
  if(!this.taskItem.trim()) return;
  this.todoList.push(this.taskItem);
  this.taskItem='';
}
deleteTodoTask(index:number){
  this.todoList.splice(index,1);
}
startEdit(index:number){
  this.updateIndex=index;
  this.updatingTask =this.todoList[index];
}
saveEdit(index:number){
  if(!this.updatingTask.trim()) return;
  this.todoList[index] = this.updatingTask;
  this.updateIndex=null;
  this.updatingTask ='';
}

cancelEdit(){
  this.updateIndex= null;
  this.updatingTask= '';
}

draggedIndex :number|null = null;
onDragStart(index:number){
  this.draggedIndex = index;
}
onDrop(targetIndex: number){
  if(this.draggedIndex === null) return;
  const draggedItem = this.todoList[this.draggedIndex];
  this.todoList.splice(this.draggedIndex, 1);
  this.todoList.splice(targetIndex, 0, draggedItem);
  this.draggedIndex=null;
}`
todoDragHtml =`.dragging{
  background: lightgray;
  opacity:0.7;
}

<div style="display: flex; gap: 20px;">
  <input type="text" [(ngModel)]="taskItem" (keyup.enter)="addTodoTask()" placeholder="Enter..."/>
  <button (click)="addTodoTask()">Add </button>
</div>
<ul>
  <li *ngFor="let list of todoList; let i = index" draggable="true" (dragstart)="onDragStart(i)" (dragover)="$event.preventDefault()" (drop)="onDrop(i)" [class.draggable]="draggingIndex === i">
    <ng-container *ngIf="updateIndex!==i; else editMode"> 
      {{list}}
      <button (click)="startEdit(i)">Edit</button>
      <button (click)="deleteTodoTask(i)">Delete</button>
    </ng-container>
    <!-- //else must in ng-template only; else it gives error-->
    <ng-template #editMode>
      <div style="display: flex; gap: 20px;">  
        <input type="text" [(ngModel)]="updatingTask" placeholder="Edit.." (keyup.enter)="saveEdit(i)"/>
        <button (click)="saveEdit(i)">save</button>
        <button (click)="cancelEdit()">Cancel</button>
      </div>
    </ng-template>
  </li>
</ul>`

grid =Array.from({length:9})   //gives 9 null items in array=  Array(9)
grids = Array.from({length:9}, ((_, i)=> i+1))  //add 1-9

lights = Array(9).fill(false);

toggle(index:number){
  this.lights[index]= !this.lights[index]
}

gridCode = `grid =Array.from({length:9})   //gives 9 null items in array=  Array(9)
grids = Array.from({length:9}, ((_, i)=> i+1))  //add 1-9

lights = Array(9).fill(false);

toggle(index:number){
  this.lights[index]= !this.lights[index]
}`;

gridHtml = `
.grid-light {
  display:grid;
  grid-template-columns: repeat(3,1fr);
  gap: 10px;
}
.cell-light{
  height: 80px;
  cursor: pointer;
  display:flex;
  justify-content: center;
  align-items: center;
  background: 'gold';
}
.active{
  background: blue;
}

<p>{{grid | json}}</p>
<p>{{grids | json}}</p>

<div class="grid-light">
  <div *ngFor="let light of grids; let i = index" class="cell-light" [class.active]="lights[i] ? '': 'light'" (click)="toggle(i)">
    {{i+1}}
  </div>
`;
isModalOpen = false;
openModal (){
  this.isModalOpen=true;
}
closeModal(){
  this.isModalOpen= false;
}

modalTs =`isModalOpen = false;
openModal (){
  this.isModalOpen=true;
}
closeModal(){
  this.isModalOpen= false;
}`

modalCode =`.backdrop{
  position:fixed;
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display:flex;
  justify-content: center;
  align-items:center;
}
.modal{
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

<button (click)="openModal()">Open Modal</button>
<div class="backdrop" *ngIf="isModalOpen" (document:keydown.escape)="closeModal()" (click)="closeModal()">
  <div class="modal" (click)="$event.stopPropagation()">
    <h2> Modal Title</h2>
    <p> Modal content</p>
    <button (click)="closeModal()">close</button>
  </div>
</div>`
}

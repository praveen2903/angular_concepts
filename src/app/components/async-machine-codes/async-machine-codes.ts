import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-async-machine-codes',
  standalone: false,
  templateUrl: './async-machine-codes.html',
  styleUrl: './async-machine-codes.css',
})
export class AsyncMachineCodes {

  constructor(private cdr: ChangeDetectorRef ){}
  lights = [
  { color: 'red', duration: 20000 },
  { color: 'green', duration: 15000 },
  { color: 'yellow', duration: 10000 }
];
currentIndex = 0;
isRunning = false;
timeoutId: any;

ngOnInit() {
  console.log('init')
  this.start();
  this.gridStart();
}

start() {
  console.log('hi')
  if (this.isRunning) return;

  this.isRunning = true;
  this.changeLight();
}

changeLight() {
  if (!this.isRunning) return;

  this.timeoutId = setTimeout(() => {
    this.currentIndex = (this.currentIndex + 1) % this.lights.length;
    this.cdr.detectChanges();
    this.changeLight();

  }, this.lights[this.currentIndex].duration);
}

stop() {
  this.isRunning = false;
  clearTimeout(this.timeoutId);
}
ngOnDestroy() {
  clearTimeout(this.timeoutId);
  clearTimeout(this.gridtimeoutId)
}

trafficLightsCode = `constructor(private cdr: ChangeDetectorRef ){}
  lights = [
  { color: 'red', duration: 20000 },
  { color: 'green', duration: 15000 },
  { color: 'yellow', duration: 10000 }
];
currentIndex = 0;
isRunning = false;
timeoutId: any;

ngOnInit() {
  console.log('init')
  this.start();
}

start() {
  console.log('hi')
  if (this.isRunning) return;

  this.isRunning = true;
  this.changeLight();
}

changeLight() {
  if (!this.isRunning) return;

  this.timeoutId = setTimeout(() => {
    this.currentIndex = (this.currentIndex + 1) % this.lights.length;
    this.cdr.detectChanges();
    this.changeLight();

  }, this.lights[this.currentIndex].duration);
}

stop() {
  this.isRunning = false;
  clearTimeout(this.timeoutId);
}
ngOnDestroy() {
  clearTimeout(this.timeoutId);
}`;
trafficLightsHtml = `<p>{{currentIndex}}</p>
<p>{{isRunning}}</p>
<div class="traffic-light">
    <div *ngFor="let light of lights; let i=index" class="light" [class.active]="i === currentIndex" [style.background]="light.color">
</div>
</div>
<button (click)="start()">start</button>
<button (click)="stop()"> stop</button>`;


cdrExample = `========================================================
ChangeDetectorRef (CDR)
========================================================
Purpose
--------------------------------------------------------
ChangeDetectorRef is used to manually trigger Angular change detection when Angular does not automatically update the UI after a state change.

Why?
--------------------------------------------------------
Sometimes Value Changes But UI Does Not Update.
Example
--------------------------------------------------------
setTimeout(()=>{
  this.count++;
  this.cdr.detectChanges();
},1000);
========================================================
Most Used Method
--------------------------------------------------------
this.cdr.detectChanges(); -- inside timeout

Meaning
--------------------------------------------------------
"Angular, Refresh UI Now"
========================================================
When Must Used else the changes don't appear?
--------------------------------------------------------
✓ setTimeout
✓ setInterval
✓ WebSocket
✓ Third Party Libraries
✓ OnPush Components
========================================================
Without CDR
--------------------------------------------------------
Value Changed
      ↓
Console Updated
      ↓
UI Not Updated
========================================================
With CDR
--------------------------------------------------------
Value Changed
      ↓
detectChanges()
      ↓
UI Updated
========================================================
Traffic Light Example
--------------------------------------------------------
setTimeout(()=>{
  this.currentIndex++;
  this.cdr.detectChanges();
},1000);
========================================================
Memory Trick
--------------------------------------------------------
Angular = Auto Refresh
CDR = Manual Refresh Button

ChangeDetectorRef is used to manually trigger Angular change detection when Angular does not automatically update the UI after a state change.




========================================================
DestroyRef
========================================================
Purpose
------------------
Cleanup Resources.

Example
------------------
destroyRef.onDestroy(()=>{
 clearInterval(id);
});

Used In
------------------
Angular 16+

Interview Trap
------------------
Modern Alternative To ngOnDestroy.`

otherCommonUsed = `========================================================
ElementRef
========================================================
Purpose
------------------
Access Real DOM Element.

Example
------------------
<input #box type="text" placeholder="This input will be focused programmatically">
<button (click)="triggerFocus()">Click to Focus Input</button>

@ViewChild('box')
box!: ElementRef;

triggerFocus() { this.box.nativeElement.focus(); }

Used In
------------------
Focus Input
Scroll
DOM Manipulation

Interview Trap
------------------
Avoid Excessive DOM Manipulation. Use Angular Binding First with # for that element.

========================================================
ViewChild
========================================================
Purpose
------------------
Access Component Or Element.

Example
------------------
@ViewChild('input')
input!: ElementRef;

ngAfterViewInit(){
 this.input.nativeElement.focus();
}

Used In
------------------
Input Focus
Child Component Access

Interview Trap
------------------
Available After ngAfterViewInit().

========================================================
Renderer
========================================================
Purpose
------------------
Safe DOM Manipulation.

Example
------------------
this.renderer.addClass(element, 'active');

Used In
------------------
Add Class
Remove Class
Create Elements

Interview Trap
------------------
Preferred Over nativeElement.

========================================================
NgZone
========================================================
Purpose
------------------
Run Code Inside Angular.

Example
------------------
this.zone.run(()=>{
 this.count++;
});

Used In
------------------
WebSockets
Third Party Libraries

Interview Trap
------------------
Helps Trigger Change Detection.`


gridLights = Array(9).fill(false);
gridIndex = 0;
gridtimeoutId: any;
gridStarted = false;
intervalTime = 1000;

gridStart(){
  if(this.gridStarted) return;

  this.gridStarted = true;
  this.gridLights[0] = true;
  this.highlightGrid();
}

highlightGrid(){
  if(!this.gridStarted) return;

  this.gridtimeoutId = setTimeout(()=>{
      this.gridLights[this.gridIndex] = false;
      this.gridIndex = (this.gridIndex + 1) % this.gridLights.length;
      this.gridLights[this.gridIndex] = true;
      this.cdr.detectChanges();
      this.highlightGrid();
    }, this.intervalTime);
}

gridStop(){
  this.gridStarted = false;
  clearTimeout(this.gridtimeoutId);
}

gridLightsCode = `gridLights = Array(9).fill(false);
gridIndex = 0;
gridtimeoutId: any;
gridStarted = false;
intervalTime = 1000;

ngOnInit() {
  this.gridStart();
}

gridStart(){
  if(this.gridStarted) return;

  this.gridStarted = true;
  this.gridLights[0] = true;
  this.highlightGrid();
}

highlightGrid(){
  if(!this.gridStarted) return;

  this.gridtimeoutId = setTimeout(()=>{
      this.gridLights[this.gridIndex] = false;
      this.gridIndex = (this.gridIndex + 1) % this.gridLights.length;
      this.gridLights[this.gridIndex] = true;
      this.cdr.detectChanges();
      this.highlightGrid();
    }, this.intervalTime);
}

gridStop(){
  this.gridStarted = false;
  clearTimeout(this.gridtimeoutId);
}
ngOnDestroy(){
  clearTimeout(this.gridtimeoutId);
}`;

gridLightsHtml = `.cell-light{
  height: 80px;
  cursor: pointer;
  display:flex;
  justify-content: center;
  align-items: center;
  background: 'gold';
}
.grid-active{
  background: blue;
}
.grid-inactive{
  background: gold;
}


<div style="display: grid; grid-template-columns: repeat(3,1fr);">
    <div *ngFor="let grid of gridLights; let i = index" class="grid-light" [class.grid-active]="gridLights[i]" [class.grid-inactive]="!gridLights[i]">
        {{i+1}}
    </div>
</div>
<button (click)="gridStart()">Start</button>
<button (click)="gridStop()">Stop</button>`
}

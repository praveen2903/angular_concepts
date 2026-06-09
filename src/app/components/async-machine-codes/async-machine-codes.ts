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
  { color: 'red', duraeion: 20000 },
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
  this.changeDate()
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

gridLightsCode = `
constructor(private cdr: changeDetectionRef) {}

gridLights = Array(9).fill(false);
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

currentTime =0;
timeIntervalId:any;
timeStarted = false;
timeInterval =1000;

timeStart(){
  if(this.timeStarted) return;

  this.timeStarted= true;
  this.timeChange();
}
timeChange(){
  if(!this.timeStarted) return;

  this.timeIntervalId= setInterval(()=>{
    this.currentTime++;
    this.cdr.detectChanges();   

//Note:-the timeout needs to call method since it destroy previous timeout and create new everytime but interval keeps on running so new intervals cause disturbance
  }, this.timeInterval)
}
timeStop(){
  this.timeStarted= false;
  clearInterval(this.timeIntervalId);
}

stopWatchCode = `
constructor(private cdr: changeDetectionRef) {}
currentTime =0;
timeIntervalId:any;
timeStarted = false;
timeInterval =1000;
ngOnInit(){
   this.timeStart(); //like useEffect with empty dependency when page loads initial call happens
}
timeStart(){
  if(this.timeStarted) return;

  this.timeStarted= true;
  this.timeChange();
}
timeChange(){
  if(!this.timeStarted) return;

  this.timeIntervalId= setInterval(()=>{
    this.currentTime++;
    this.cdr.detectChanges();   

//Note:-the timeout needs to call method since it destroy previous timeout and create new everytime but interval keeps on running so new intervals cause disturbance
  }, this.timeInterval)
}
timeStop(){
  this.timeStarted= false;
  clearInterval(this.timeIntervalId);
}
  
ngOnDestroy(){
  clearInterval(this.timeIntervalId);
}`;
stopWatchHtml = `<h3>Stop Watch</h3>
<div>{{currentTime}}</div>
<button (click)="timeStart()">Start</button>
<button (click)="timeStop()">Stop</button>`;

currentDate: Date = new Date();
dateIntervalId:any;
changeDate(){
  this.dateIntervalId = setInterval(()=>{
    this.currentDate = new Date();
    this.cdr.detectChanges();
  }, 1000)
}
changeDateHtml = `<div>{{currentDate}}</div>
<div>{{ currentDate | date:'dd/MM/yyyy HH:mm:ss' }}</div>
<div>{{ currentDate | date:'dd/MM/yyyy' }}</div>
<div>{{ currentDate | date:'HH:mm:ss' }}</div>
<div>{{ currentDate | date:'hh:mm:ss a' }}</div>
<div>
  GMT : {{ currentDate | date:'dd/MM/yyyy HH:mm:ss':'UTC' }}
</div>
<div>
  PST :
  {{ currentDate | date:'dd/MM/yyyy HH:mm:ss':'America/Los_Angeles' }}
</div>
<div>
  EST :
  {{ currentDate | date:'dd/MM/yyyy HH:mm:ss':'America/New_York' }}
</div>
<div>
  IST :
  {{ currentDate | date:'dd/MM/yyyy HH:mm:ss':'Asia/Kolkata' }}
</div>

<span>interview formats</span>
<div>
<!-- 09 Jun 2026 -->
{{ currentDate | date:'dd MMM yyyy' }}
</div>
<div>
    <!-- Tuesday, June 09, 2026 -->
{{ currentDate | date:'EEEE, MMMM dd, yyyy' }}
</div>

<div>
<!-- 18:45 -->
{{ currentDate | date:'HH:mm' }}
</div>
<div>
    <!-- 06:45 PM -->
{{ currentDate | date:'hh:mm a' }}
</div>

<div>
    <!-- Jun 09, 2026 06:45 PM -->
{{ currentDate | date:'MMM dd, yyyy hh:mm:ss a' }}
</div>`;
changeDateCode = `ngOnInit(){
  this.changeDate();
}

currentDate: Date = new Date();
dateIntervalId:any;

changeDate(){
  this.dateIntervalId = setInterval(()=>{
    this.currentDate = new Date();
    this.cdr.detectChanges();   //set interval so need to call function to create new intervals it is for timeouts
  }, 1000)
}
ngOnDestroy(){
  clearInterval(this.dateIntervalId)
}`
}

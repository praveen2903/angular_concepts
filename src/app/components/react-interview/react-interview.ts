import { Component } from '@angular/core';

@Component({
  selector: 'app-react-interview',
  standalone: false,
  templateUrl: './react-interview.html',
  styleUrl: './react-interview.css',
})
export class ReactInterview {
  useStateCode = `
useState

What Is It?
------------
State Management Hook.

Purpose
------------
Store UI Data.

Interview Trap
------------
State Updates are Asynchronous.

Example
------------
const [count,setCount]
=
useState(0);

setCount(count+1);

console.log(count);

Output
------------
Old Value

Reason
------------
React schedules update.

Real Usage
------------
Counters
Forms
Toggles
Shopping Cart
`;

useEffectCode = `
useEffect

Purpose
------------
Side Effects.

Used For
------------
API Calls
Subscriptions
Timers

Interview Trap
------------
Runs after render.

Example
------------
useEffect(()=>{
 loadUsers();
},[]);

Dependency Array
------------
[]

Runs Once

Real Usage
------------
API Calls
Socket Connections
Analytics
`;

useRefCode = `
useRef

Purpose
------------
Store mutable values.

Interview Trap
------------
Changing ref DOES NOT rerender component.

Example
------------
const inputRef = useRef(null);
inputRef.current.focus();

_____________________________________
const [count, setCount]= useState(0);
const counterRef = useRef(0);
useEffect(()=>{
  counterRef.current++;
},[count])
return (
  <>
    <p>{count} : value</p>
    <p>{counterRef.current}: previous value</p>
    <button onClick = {()=> setCount(count+1)}>click</button>
  </>
);

flow:-

Execute Function Body: React runs your code, initializes useState, and creates the initial layout instructions.
Virtual DOM Generated: React calculates the differences.
DOM Updates: React alters the real HTML structure.
Refs Hooked Up: React changes your myRef.current from null to the true DOM element.
Browser Paints Screen: The user visually sees the page.
useEffect Setup Fired: The callback functions inside your useEffect blocks execute.

Real Usage
------------
Focus Input
Timers  -to stop and start neatly
Previous Values -- kept in useEffect post paint ref don't rerender and display previous value though the value updated
`;


reactMemoCode = `
React.memo

Purpose
------------
Prevent unnecessary rerenders.

Interview Trap
------------
Works only if props don't change.

Example
------------
export default React.memo(UserCard);

real example:
import React, { useState } from "react";

function Child() {
  console.log("Child Rendered");

  return <h2>Child Component</h2>;
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <Child />
    </>
  );
}
  Initial Render
--------------
App Rendered
Child Rendered

Click Increment
--------------
App Rendered
Child Rendered ❌


import React, { memo, useState } from "react";

const Child = memo(() => {
  console.log("Child Rendered");

  return <h2>Child Component</h2>;
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <Child />
    </>
  );
}
Initial Render
--------------
App Rendered
Child Rendered

Click Increment
--------------
App Rendered
Child Not Rendered ✅

Real Usage
------------
Large Lists
Dashboards
Tables
`;

useMemoCode = `
useMemo

Purpose
------------
Memoize Expensive Calculations and Like same object persists through renders check tooltip and large calculations get caching.

Interview Trap
------------
Returns Cached Value.

Example
------------
const total = useMemo(()=>{
  return products.reduce((a,b)=>
      a+b.price,0
   );
 },[products]);

Real Usage
------------
Large Tables
Filtering
Sorting
`;

useCallbackCode = `
useCallback

Purpose
------------
Memoize Functions.

Keeps same function reference between renders.

Interview Trap
------------
Returns Cached Function.
Without useCallback, new function gets created on every render.

Example
------------
const fetchUsers = useCallback(()=>{
   loadUsers();
},[]);

same as :-
const fetchUsers = useMemo(
 ()=>()=>loadUsers(),
 []
);

Real Usage
------------
Passing callbacks to child components.
Button Handlers
API Functions
Event Handlers
React.memo Children

Memory Flow
------------
Parent Render
      ↓
Function Created
      ↓
Same Dependencies ?
      ↓
Return Old Function

Dependencies Changed ?
      ↓
Create New Function

Important
------------
useCallback does NOT stop renders.
It only preserves function reference.
Mostly used with React.memo.
`;

useMemoVsUseCallbackVsMemo = `
React.memo
------------
Caches Component

Input
------------
Props

Returns
------------
Component

Example
------------
const Child = React.memo(ChildComponent);

================================================
useMemo
------------
Caches Value

Input
------------
Calculation

Returns
------------
Value

Example
------------
const total = useMemo(()=>{
  return products.reduce((a,b)=>
    a+b.price, 0
  );
},[products]);

================================================

useCallback
------------
Caches Function

Input
------------
Function

Returns
------------
Function

Example
------------
const save = useCallback(()=>{
   apiCall();
},[]);

================================================

Interview Answer
------------
React.memo
     ↓
Component Cache

useMemo
     ↓
Value Cache

useCallback
     ↓
Function Cache

---------------------------------------------------------------------------
React.memo stops unnecessary component renders.
useMemo keeps the same value/object reference.
useCallback keeps the same function reference.
React.memo becomes most effective when used together with useMemo and useCallback.
`;

reactOptimizationCode = `
React.memo
--------------------------------

What does it cache?
--------------------------------
Component Render

Why?
--------------------------------
Prevents Child Component
from rendering again if props
did not change.

Returns
--------------------------------
Memoized Component

Example
--------------------------------
const Child = React.memo(() => {
  return <h1>Child</h1>;
});

Used For
--------------------------------
Large Components
Tables
Cards
Lists

================================================

useMemo
--------------------------------

What does it cache?
--------------------------------
Value / Object / Array

Why?
--------------------------------
Expensive calculations run only
when dependencies change.

Also keeps same object reference.

Returns
--------------------------------
Cached Value

Example
--------------------------------
const total = useMemo(() => {
  return products.reduce((sum,p)=>
  sum+p.price, 0
  );
}, [products]);

Object Example
--------------------------------
const user = useMemo(() => ({
  id: 1,
  name: "Praveen"
}), []);

Used For
--------------------------------
Filtering
Sorting
Large Calculations
Objects
Arrays

================================================

useCallback
--------------------------------

What does it cache?
--------------------------------
Function

Why?
--------------------------------
Keeps same function reference between renders.

Returns
--------------------------------
Cached Function

Example
--------------------------------
const saveUser = useCallback(() => {
  apiCall();
}, []);

Used For
--------------------------------
Button Handlers
API Calls
Child Callbacks`;


virtualDomCode = `
Virtual DOM

What Is It?
------------
Virtual copy of Real DOM.

Interview Trap
------------
React does NOT update
entire DOM.

Flow
------------
State Change
      ↓
Virtual DOM
      ↓
Diffing
      ↓
Update Changed Node

Real Usage
------------
Every React App
`;

reconciliationCode = `
Reconciliation

Purpose
------------
Compare old tree vs new tree based on keys if same, no new objects, else create new ones.

Interview Trap
------------
Keys are important.

Example
------------
users.map(user=>
 <UserCard key={user.id}/>
)

Without Keys
------------
Bad Performance

With Keys
------------
Efficient Updates`;

contextCode = `
Context API

Purpose
------------
Avoid Prop Drilling.

Interview Trap
------------
Not replacement
for Redux.

Example
------------
const UserContext =
createContext();

<UserProvider>

<App/>

</UserProvider>

Real Usage
------------
Theme
Language
Logged User
`;

debounceMachineCode = `
Debounce Search

Problem
------------
Search while typing.

Core Snippet
------------
const debounceRef = useRef();

const search = e => {
 clearTimeout(debounceRef.current);

 debounceRef.current = setTimeout(()=>{
  fetchUsers(e.target.value);
 },500);
};

Interview Trap
------------
Without debounce
100 key presses= 100 API Calls

Real Usage
------------
Google
Amazon
Netflix
`;

infiniteMachineCode = `
Infinite Scroll

Problem
------------
Load data while scrolling.

Core Snippet
------------
const observer =
new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){
   loadMore();
  }
 }
);

Interview Trap
------------
Append Data

✔ Correct

Replace Data

❌ Wrong

Real Usage
------------
Instagram
Facebook
LinkedIn
`;

cartMachineCode = `
Shopping Cart

Problem
------------
Global Cart State.

Core Snippet
------------
dispatch(addToCart(product));

const items = useSelector(
 state => state.cart.items
 );

Interview Trap
------------
Do NOT mutate arrays.
Use immutable updates.

Real Usage
------------
Amazon
Flipkart
Myntra
`;


formMachineCode = `
Employee Form

Problem
------------
Dynamic Skills.

Core Snippet
------------
const {

 fields,

 append,

 remove

}
=
useFieldArray({

 control,

 name:'skills'

});

Interview Trap
------------
Dynamic Fields

=
useFieldArray

Real Usage
------------
Resume Builder
Employee Portal
`;

optimisticCode = `
Optimistic Update

Problem
------------
Update UI before API response.

Core Snippet
------------
setTodos(prev => [...prev, newTodo]);
await api.createTodo();

Interview Trap
------------
Rollback if API fails.

Real Usage
------------
Twitter Likes
Instagram Likes
Comments
`;


reactTraps = [
{
  title:'Virtual Dom',
  code: this.virtualDomCode,
},
{
  title:'Reconciliation',
  code: this.reconciliationCode,
},
{
  title:'UseState Hook',
  code: this.useStateCode
},
{
  title:'UseEffect Hook',
  code: this.useEffectCode,
},
{
  title:'usecontext Hook',
  code: this.contextCode,
},
{
  title:'useRef Hook',
  code: this.useRefCode,
},
{
  title:'useMemo Hook',
  code: this.useMemoCode,
},
{
  title:'useCallback Hook',
  code: this.useCallbackCode,
},
{
  title:'optimization',
  code: this.optimisticCode,
},
{
  title:'Usage',
  code: this.useMemoVsUseCallbackVsMemo,
},
{
  title:'Debounce code',
  code: this.debounceMachineCode,
},
{
  title:'Infinite scroll',
  code: this.infiniteMachineCode,
},
{
  title:'cart Redux',
  code: this.cartMachineCode,
},
{
  title:'React Hook form',
  code: this.formMachineCode,
},
{
  title:'optimistic code',
  code: this.optimisticCode,
},

{
title:'useState Trap',
code:`
Quesiion
------------
What is output?

const [count,setCount] = useState(0);
consl handleClick=()=>{
 setCount(coune+1);
 console.log(count);
}

Answer
------------
0 NOT 1

Reason
------------
State updates are asynchronous.

Correct Way
------------
useEffect(()=>{
 console.log(count);
},[count]);
`
},

{
title:'Multiple setState Trap - React batching must be used since the value gets updated only post paint',
code:`
Question
------------
What is output?

setCount(count+1);
setCount(count+1);
setCount(count+1);

Answer
------------
+1

NOT +3

Reason
------------
All use same closure value.

Correct Way
------------
setCount(prev=>prev+1);
setCount(prev=>prev+1);
setCount(prev=>prev+1);

Output
------------
+3
`
},

{
title:'useEffect Dependency Trap',
code:`
Question
------------
Why infinite loop?
useEffect(()=>{
 fetchUsers();
});

Answer
------------
Runs every render.

Correct
-----------
useEffect(()=>{
 fetchUsers();
},[]);

Trap
------------
Missing dependency array.
`
},

{
title:'useEffect Cleanup Trap',
code:`
Question
------------
Why memory leak?

useEffect(()=>{
 const id = setInterval(()=>{
 },1000);
},[]);

Answer
------------
Interval never cleared.

Correct
------------
useEffect(()=>{
 const id =setInterval(()=>{},1000);

 return ()=>{
  clearInterval(id);
 };
},[]);
`
},

{
title:'useRef Trap',
code:`
Question
------------
Will UI rerender?

const countRef = useRef(0);
countRef.current++;

Answer
------------
NO

Reason
------------
Ref changes don't rerender.

Trap
------------
Many developers treat ref like state.
`
},

{
title:'useMemo Trap',
code:`
Question
------------
Will useMemo always help?

const result = useMemo(()=>a+b, [a,b]);

Answer
------------
NO

Reason
------------
Memoization has cost.

Use Only
------------
Expensive calculations.

Trap
------------
Using useMemo everywhere.
`
},

{
title:'useCallback Trap',
code:`
Question
------------
Does useCallback improve performance?

Answer
------------
Not always.

Trap
------------
Wrapping every function.

Correct Use
------------
When passing callbacks to memoized children.
`
},

{
title:'React.memo Trap',
code:`
Question
------------
Will React.memo stop rerender?
<UserCard data={{name:'John'}}
/>

Answer
------------
NO

Reason
------------
New object created every render.

Correct
------------
const user =useMemo(()=>({
 name:'John'
}),[]);

<UserCard data={user}/>
`
},

{
title:'Key Prop Trap- reconcialate properly with correct keys',
code:`
Question
------------
Why bad?

users.map((user,index)=>
 <UserCard key={index}/>
)

Answer
------------
Index changes.
Wrong DOM reuse.

Correct
------------
key={user.id}
`
},

{
title:'Controlled Input Trap',
code:`
Question
------------
Difference?
<input value={name}/>
<input defaultValue={name}/>

Answer
------------
value= Controlled

defaultValue=Uncontrolled

Interview Favorite
------------
React Hook Form uses
uncontrolled inputs.
`
},

{
title:'Redux Mutation Trap -- RTK ',
code:`
Question
-------------------
Is this wrong?
state.users.push(user);
Most developers say YES because Redux state should be immutable.

Why it looks wrong?
-------------------
Array.push() mutates the original array.

Example:
const users = ["Alice"];
users.push("Bob");
Result: ["Alice", "Bob"]

The original array was modified.
In traditional Redux this is NOT allowed because reducers must never mutate state.

Traditional Redux Way
-------------------
return {
  ...state,
  users: [...state.users, user]
};
A new array is created instead of modifying the existing one.

Why does it work in Redux Toolkit?
-------------------
Redux Toolkit uses Immer internally.

When you write:
state.users.push(user);
Immer creates a Proxy around the state.
It watches all changes and automatically converts them into immutable updates.

Internal Flow
-------------------
state.users.push(user)
        ↓
Immer Proxy tracks change
        ↓
Creates new copy of state
        ↓
Redux store receives new immutable state

What Redux Toolkit Actually Generates
-------------------
You write:
state.users.push(user);
Immer roughly converts it to:

return {
  ...state,
  users: [...state.users, user]
};

Important Interview Point
-------------------
You are NOT mutating the real Redux state.
You are mutating a temporary draft state created by Immer.
Immer then produces a brand-new immutable state object.

Interview Answer
-------------------
state.users.push(user) normally mutates an array and would be wrong in traditional Redux. 
However, in Redux Toolkit it is valid because Immer intercepts the mutation, tracks the changes, and generates a new immutable state behind the scenes.`
},

{
title:'Context API Trap',
code:`
Question
------------
Context vs Redux?

Answer
------------
Context= Props Dependency Injection 
Redux  = global State Management

Trap
------------
Context is NOT Redux.
`
},

{
title:'Closure Trap',
code:`
Question
------------
Why old value?

setTimeout(()=>{
 console.log(count);
},5000);

Answer
------------
Closure captures old state.

Solution
------------
useRef() or Functional Update.

1. useRef() solution:
import { useState, useRef, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  // Keep the ref synchronized with the latest state
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const handleAlertClick = () => {
    setTimeout(() => {
      // Accesses the mutable .current property, which is always up-to-date
      console.log(countRef.current);
    }, 5000);
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleAlertClick}>Show Alert in 5s</button>
    </div>
  );
}

2. functional update():

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const handleAsyncIncrement = () => {
    setTimeout(() => {
      // prevCount is guaranteed to be the freshest state at the moment of execution
      setCount((prevCount) => {
        console.log(prevCount); // Logs the correct latest value
        return prevCount + 1;
      });
    }, 5000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={handleAsyncIncrement}>Increment in 5s</button>
    </div>
  );
}`
},

{
title:'Async State Trap -- not viable to await a state',
code:`
Question
------------
Can we await setState?
await setCount(5);

Answer
------------
NO

Reason
------------
setState returns void. Using await setState(5) is wrong because the setState function does not return a Promise.
In JavaScript, the await keyword only pauses execution when it is placed in front of a function that returns a Promise. 
Because setState returns undefined (or void), adding await has absolutely no effect. The code will keep running immediately without waiting for the state to update.


The Core Issues:
No Promise to Await: React's useState setter functions and legacy class this.setState do not return a Promise object.
Stale State Values: If you place await setState(5) thinking the next line of code will read the updated value, it won't. React batches and schedules state updates asynchronously. The variable will still hold the old value on the very next line due to how JavaScript closures work.


Fixes:-

If your subsequent code relies on the value 5, do not try to read the state variable immediately. Instead, use the value directly or leverage React's built-in lifecycles.Approach 1: Use the value directly.
const handleUpdate = async () => {
  const newValue = 5;
  setState(newValue);
  
  // Use newValue directly instead of awaiting the state variable
  await sendDataToAPI(newValue); 
};


Approach 2: Use the useEffect HookIf you need to trigger a side effect specifically after the state successfully updates and the component re-renders.
useEffect(() => {
  if (state === 5) {
    // This runs automatically after the state updates and the component re-renders
    performAction();
  }
}, [state]); // Dependency array tracks changes to 'state'
If you are trying to solve a specific race condition in your code, let me know what action you are trying to perform right after updating the state, or whether you are using functional or class components.
 I can provide the exact code block you need!


Trap
------------
Common interview question.
`
},

{
title:'Derived State Trap -cannot be in useState instead set',
code:`
Question
------------
Wrong?
const [fullName, setFullName]= useState(firstName+' '+lastName);

Answer
------------
Derived state.
Avoid storing it.

Correct
------------
const fullName = firstName+' '+lastName;`
}
];
}

---
title: React Hooks Tic-Tac-Toe
description: Simple Tic-Tac-Toe game using React Hooks
author: "Ricardo de Arruda"
date: 2019-09-22
draft: false 
tags: [React, Hooks, beginner, game]
---

## Introduction
React Hooks is a new addition to [React version 16.8](https://reactjs.org/docs/hooks-intro.html
), allowing to use State in Function. I personally prefer to work with Function over Class in Javascript and now we can do it.
The Idea for this Tutorial is to reproduce the game [Tic-Tac-Toe](https://en.wikipedia.org/wiki/Tic-tac-toe
) using React Hooks.

## Setup
For this tutorial we going to user [ create-react-app ](https://github.com/facebook/create-react-app
), so be sure to have [ Nodejs and NPM](https://nodejs.org/en/
) install in your computer.

In your terminal execute the command:
```bash
npx create-react-app tic-tac-toe
cd tic-tac-toe
```
Now that we create a React App open the directory with a text editor of your choice e.g [vim](https://www.vim.org/
)

## Create Components 

All your source files will be inde de src/ directory. Lets create a new directory for our components.

Inside tic-tac-toe/src create a new /components directory and two new files **Table.js** and **TicBlock.js**.
The Table.js going to be a component that going to wrap the TicBlock.js, Ticblock.js are going to be each of the 9 blocks that the user can add X or O.

We need to import Table to our App.js first.

App.js
```javascript
import React from 'react';
// Allow us to use JXS
import './App.css';
// Import the Style
import Table from './components/Table'
// Import the Table.js components
function App() {
  return (
      <div>
          <Table />
       </div>
  );
}


export default App;
//export in order to be imported by index.js, that is the root file for this App.
```
If you need more information about the JSX please check this [Link](https://reactjs.org/docs/introducing-jsx.html
).

Know we can edit the **Table.js** component.
First we need to import the Hook [ userState ](https://reactjs.org/docs/hooks-reference.html#usestate
) and [ useEffect ](https://reactjs.org/docs/hooks-reference.html#useeffecthttps://reactjs.org/docs/hooks-reference.html#useeffect
). Hooks *are functions that let you “hook into” React state and lifecycle features from function components*[^1]
[^1]: https://reactjs.org/docs/introducing-jsx.html

For Table we can set three useState, that Table and Table's child will have access.
```javascript
    const [table, setTable] = useState([0,0,0, 0,0,0, 0,0,0])
    const [winner, setWinner] = useState([])
    const [last, setLast] = useState(Math.random() > 0.5? 5:3)
```
*table* and *setTable* will manage the table state for the X and 0.
*winner* and *setWinner* will track the winners
*last* and *setLast* will track the last move beeing integer 3 mapping the X
and 5 mapping the O. and set a random last to be 5 or 3.

Now we can use the React Hook *useEffect* that will run everytime that *table* state changed.
The *useEffect* will check if the game is over, if the sum of a row get's to 9,3x3,we X is the winner if 
the sum gets 15, 3x5, we know that the O is the winner, and the same applying to diagonal.
```javascript
    useEffect(()=>{
        //checking winner row and col
        for (let i = 0; i <= 2; i++){
            const idx = (i % 3) * 3 // -> 0,3,6
            //check row
            if ( (table[idx] + table[idx+1] + table[idx+2] )=== 9 || (table[idx] + table[idx+1] + table[idx+2] ) === 15){
                setWinner([idx,idx+1,idx+2])
                gameOver()
            }
            //check col
            if ((table[i] + table[i+3] + table[i+6] )=== 9 || (table[i] + table[i+3] + table[i+6] ) === 15){
                setWinner([i,i+3,i+6])
                gameOver()
            }
        }
        //checking winner diagonal
        if ((table[0] + table[4] + table[8] ) === 15 || (table[0] + table[4] + table[8] ) === 9 ){
            setWinner([0, 4, 8])
            gameOver()
        }
        if ((table[2] + table[4] + table[6] ) === 9 || (table[2] + table[4] + table[6] ) ===15){
            setWinner([2, 4, 6])
            gameOver()
        }
        // check if tble completed
        if (table.indexOf(0) === -1){
            gameOver()
        }
    }, [table])
```
The last argument *[table]* is the component that React is going to check and run the *useEffect*
for any update in *[table]* in this case.

For the blocks we created a component call *TicBlock* that have an attribute *number*
that will be unique, *last* that will receive the *last* and *setLast* Hooks and *table* that
will receive the Hooks *table* and *setTable*.
```javascript
<TicBlock number={0 to 9} last={[last,setLast]} table={[table,setTable]} winner={winner}/> 
```
For the *TicBLock* we gonna define get the props for the parent *table*:
```javascript
    const number = props.number 
    const [last, setLast] = props.last
    const [table, setTable] = props.table
    const winner = props.winner
```
So we can use the props to check if we render a empty space, X or O 

if is Circle:
```javascript
<Circle fill={winner.indexOf(number) !== -1? 'red':""} width="100%" height="100%"/>
```
If is X:
```javascript
<x fill={winner.indexof(number) !== -1? 'red':""} width="100%" height="100%"/>
```
Now we need a onClick event listening on the *TicBLock* and change the
state *setTable* to X or O:
```javascript
<div className="ticblock" onClick={() => {
    if (table[number] === 0 && winner.length === 0) {
    setTable(( () => {
        let newTable = [...table];
        let newLast = last === 3? 5:3
        newTable[number] = newLast
        setLast(newLast)
        return newTable
    })())}
```
<iframe
    src="https://codesandbox.io/embed/github/arrudaricardo/tic-tac-toe-react-hook/tree/master/?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="tic-tac-toe"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

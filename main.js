//states
let UNDEFINED = 0;
let NUMBER = 1;
let stuff = [];

//button on press
function calculate() {
  //get user-inputted expression
  let field = document.getElementById("textbox");
  let val = field.innerHTML;

  //reset state to undefined
  state = UNDEFINED;
  let curNum='';

  //parse through expression
  for (let i = 0; i < val.length; i++) {
    let c = val[i];
    if (state === NUMBER) {
      if (c >= '0' && c <= '9') {
        curNum+=c;
      } 
      else if (c === ".") {
        curNum+=c;
        state = NUMBER;
        continue;
      }
      else if (c === "+" || c === "-" || c === "*" || c === "/") {
        if (state === NUMBER) {
          stuff.push(curNum);
        }
        stuff.push(c);
        state = UNDEFINED;
        curNum='';
      }
      else if (c === "(" || c === ")") {
        if (state === NUMBER) {
          stuff.push(curNum);
          if (c !== ')') {
            stuff.push('*');
          }
        }
        stuff.push(c);
        state = UNDEFINED;
        curNum = '';
      }
      else{//garbage
        continue;
      } 
    }
    else if(state === UNDEFINED){
      if (c >= '0' && c <= '9') {
        if (stuff[i] === ')') {
          stuff.push('*');
        };
        curNum=c;
        state = NUMBER;
      }
      else if (c === ".") {
        curNum+=c;
        state = NUMBER;
        continue;
      }
      else if (c == "+" || c == "-" || c == "*" || c == "/") {
        if (state === NUMBER) {
          stuff.push(curNum);
        }
        stuff.push(c);
        state = UNDEFINED;
        curNum='';
      }
      else if (c === "(" || c === ")") {
        if (state === NUMBER) {
          stuff.push(curNum);
          stuff.push('*');
        }
        stuff.push(c);
        state = UNDEFINED;
        curNum = '';
      }
      else{//garbage
        continue;
      } 
    }
  }
  if(curNum!==''){
    stuff.push(curNum);
  }

  //evaluate all ( and )
  for (let i = 0; i < stuff.length; i++) {
    if (stuff[i] === '(') {
      let j = i+1;
      let temp = [];
      while (stuff[j] !== ')') {
        temp.push(stuff[j]);
        j++;
      }
      stuff.splice(i,j-1,evaluate(temp));
      j = 0;
      temp = []; //reset for next parentheses
    }
  }
  
  function evaluate(eq) {
  //evaluate all * and /
  for (let i = 0; i < eq.length; i++) {
    if (eq[i] === '*') {
      eq[i-1] = eq[i-1] * eq[i+1];
      eq.splice(i,2);
      i--;
    }
    else if (eq[i] === '/') {
      eq[i-1] = eq[i-1] / eq[i+1];
      eq.splice(i,2);
        i--;
    }
  }
  //evaluate all + and -
  for (let i = 0; i < eq.length; i++) {
    if (eq[i] === '+') {
      eq[i-1] = parseFloat((eq[i-1])) + parseFloat(eq[i+1]);
      eq.splice(i,2);
      i--;
    }
    else if (eq[i] === '-') {
      eq[i-1] = eq[i-1] - eq[i+1];
      eq.splice(i,2);
      i--;
    }
  }
  return eq[0];
  }
  document.getElementById("result").innerText = 'Result: ' + evaluate(stuff);
  document.getElementById("result").style.visibility = "visible";
  console.log(stuff);
  console.log('test: '+stuff);
  stuff = [];//test
}
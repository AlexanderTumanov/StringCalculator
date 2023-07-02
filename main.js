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
        stuff.push(curNum);
        stuff.push(c);
        state = UNDEFINED;
        curNum='';
      }
      else{//garbage
        continue;
      } 
    }
    else if(state === UNDEFINED){
      if (c >= '0' && c <= '9') {
        curNum=c;
        state = NUMBER;
      }
      else if (c === ".") {
        curNum+=c;
        state = NUMBER;
        continue;
      }
      else if (c == "+" || c == "-" || c == "*" || c == "/") {
        stuff.push(curNum);
        stuff.push(c);
        state = UNDEFINED;
        curNum='';
      }
      else{//garbage
        continue;
      } 
    }
  }
  if(curNum!==''){
    stuff.push(curNum);
  }
  //evaluate all * and /
  for (let i = 0; i < stuff.length; i++) {
    if (stuff[i] === '*') {
      stuff[i-1] = stuff[i-1] * stuff[i+1];
      stuff.splice(i,2);
      i--;
    }
    else if (stuff[i] === '/') {
      stuff[i-1] = stuff[i-1] / stuff[i+1];
        stuff.splice(i,2);
        i--;
    }
  }
  //evaluate all + and -
  for (let i = 0; i < stuff.length; i++) {
    if (stuff[i] === '+') {
      stuff[i-1] = parseFloat((stuff[i-1])) + parseFloat(stuff[i+1]);
      stuff.splice(i,2);
      i--;
    }
    else if (stuff[i] === '-') {
      stuff[i-1] = stuff[i-1] - stuff[i+1];
      stuff.splice(i,2);
      i--;
    }
  }
  document.getElementById("result").innerText = 'Result: ' +stuff[0];
  document.getElementById("result").style.visibility = "visible";
  console.log(stuff);
  console.log('test: '+stuff);
  stuff = [];//test
}
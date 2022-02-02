
const toggle = document.querySelectorAll('input[type="radio"]');
const body = document.querySelector('body');
const numberBtns = document.querySelectorAll('[data-type="number"]');
const operator = document.querySelectorAll('[data-type="operator"]');
const resetBtn = document.getElementById('reset');
const delBtn = document.getElementById('del');
const equalsBtn = document.getElementById('equals');
const dotBtn = document.getElementById('dot');

// exp elements displaying the numbers
const prev = document.getElementById('prev');
const current = document.getElementById('current');
// todo this function is for choosing theme using the toggle button
toggle.forEach( t => {
    t.addEventListener('click', (e) => {
        // console.log(e.target);
        // console.log(e.target.nextElementSibling);
        // console.log(e.target.id);
        
       e.target.setAttribute('checked', "");
    //    console.log(toggle);
        const unchecked = [...toggle]
        .filter( el => el !== e.target && el.removeAttribute('checked'));
        // console.log(unchecked);
        body.className='';
        body.classList.add(`bg-${e.target.value}`);
        body.classList.add(`theme-${e.target.value}`);
 
        // console.log(body.classList);
    })
})

const printCurrent = num => current.innerText = displayNumber(num);
// exp display the number in comma separated values
const displayNumber = num => {
  let value;
        if(!num.includes('.') ){
            const n = Number(num);
            value = n.toLocaleString('en');
        }
        else {
            const decimal = num;
            value=Number(decimal.split('.')[0]).toLocaleString('en') + "." + decimal.split('.')[1];
        }
        return value;
}

// exp adjust the font size if dako na numbers
const adjustFont = (element,length) => {
   return (length > 8) ?
    element.style.fontSize = '2.45rem' : element.style.fontSize= '3rem';
   
}
let currentNum ='';
let prevNum ='';
let currentOperand;
let prevOperand;
let result;

// todo to select the numbers
numberBtns.forEach( num => {
    num.addEventListener('click', ()=> {
         currentNum+=num.textContent;   
         current.innerText=currentNum;
        // console.log('currentinner',current.innerText);
        // console.log(current.innerText.replace(/\D/g,"").length,'currentinnerwithoutcommadot',current.innerText.replace(/\D/g,""));
            // exp if numbers pass the limit of digits
// console.log(currentNum.length,'currentNum', 'currentInnerw/func', displayNumber(current.innerText.replace(/,/g,"")));
// console.log('currentInnertxtNumber', Number(current.innerText.replace(/,/g,"")));
// console.log('currentInnerText', current.textContent);
//  exp length is 17 so the 16th digit to be inputted will be included in teh condition and change the value of currentNum to the displayed number and dont' append anymore numbers
        if(current.innerText.replace(/\D/g,"").length > 16){
            // console.log('numInner', current.innerText, 'currentNum',displayNumber(currentNum));
            // console.log('currentNum', currentNum);
            currentNum = currentNum.slice(0,16);
            const temp =[currentNum[0], currentNum.slice(1,4), currentNum.slice(4,7),currentNum.slice(7,10),currentNum.slice(10,13), currentNum.slice(13,16)].toString();
            // console.log('currentslice', typeof temp);
            // console.log('currentInnerw00comma', current.innerText.replace(/\D/g,""));
            // console.log('temp', temp);
        //  currentNum = current.innerText.replace(/\D/g,"");
       current.innerText = temp;
        //  console.log('currentNum', displayNumber(currentNum));
        }
        // console.log('currentNum before',currentNum);
        // console.log('prevInner', prev.innerText, 'prevNum', prevNum);
        // console.log('indexofdot',currentNum.indexOf('.'));
        // console.log('repeated?',(/[0-9]/).test(currentNum));
       adjustFont(current, current.innerText.length);     
        // exp if equals button na pindot,  reset to blank 
        if(prev.innerText.slice(-1) == '='){
            // console.log('equals detected');
            currentNum=num.innerText;
            current.innerText=currentNum;
            prev.innerText ='';
            prevNum ='';
        }
            // currentNum+=num.textContent;   
            // console.log('currentInner', current.innerText);
        // exp if balik2 pinduton ang period
        if(currentNum.indexOf('.') >= 0){
            return currentNum= printCurrent(currentNum.replace(/,/g, '').toString());
        }     
            // console.log('currentNum after',currentNum); 
        // console.log('numInner', num.innerText);
        // console.log(currentNum.includes('.'));
        // console.log(num.innerText === '.');
        // console.log(printCurrent(currentNum),'displalyed');
        // console.log(isNaN(currentNum));

        // if(currentNum.includes('.')){
        //     console.log('leftval',currentNum.split('.')[0]);
        //     console.log('rightval',currentNum.split('.')[1]);
        // }
        printCurrent(currentNum)
    //    console.log('exactnum',current.innerText.replace(/\D/,""));
    })
})

// todo select operator
operator.forEach(op => {
    op.addEventListener('click', (e) =>{
        // console.log(e.target.textContent);
        // console.log('currentNum',currentNum);
        // console.log('prevInner', prev.innerText);
        // console.log('currentvInner', current.innerText);

        // exp when theres no number yet and you press the operation buttons first
        if(prev.innerText =="" && current.innerText == '' && currentNum =="") {return}

        // exp if mupislit ng operator, ibutang na sa babaw ang equation nya empty ang sulod
        if(prev.innerText == ''){
            prev.innerText = current.innerText + e.target.textContent;
            // console.log(prev.innerText.slice(0,-1));
          
            // console.log(prev.innerText,'prevInnertxt');
       
         prevNum = current.innerText.replace(/,/g, '');
        //  console.log('prevNum:', prevNum);
                current.innerText ='';
                currentNum='';     
        }

        // exp if ilisan ang operator or update og operator
        else if(prev.innerText.slice(-1)!== e.target.textContent && currentNum == '') {
            // console.log(e.target.textContent, 'newOpp');
            prev.innerText = prev.innerText.slice(0,-1) + e.target.textContent
            // console.log('updated', prev.innerText);

        }
     // exp if equals button ang pinduton
       else if (prev.innerText.slice(-1) == '=') {
        //    console.log('equals detected');
        //     console.log('prevInner', prev.innerText,'prevNum', prevNum);
        //    console.log('currentInner', current.innerText, 'currentNum',currentNum);

           prev.innerText= displayNumber(prevNum.toString()) + e.target.textContent;
           currentNum='';
           current.innerText='';
        //    prevNum = current.innerText.replace(/,/g,"");
        //    prev.innerText = displayNumber(prevNum.toString()) + e.target.textContent;
        //    current.innerText ='';
        //    currentNum='';
    }
       
        // exp if nanay sulod ang prev and current, inig pindot ug operator automatic i calculate then result will display sa ibabaw and current val will be emptied for another input
        else {
            
            // console.log('previnner',prev.innerText,'prevNum:', prevNum);  
            // console.log('currentInner:', current.innerText,'currentNUm:', currentNum);  
            result = calculate(Number(prevNum), Number(currentNum), prev.innerText.slice(-1));
            // console.log(calculate(Number(prevNum), Number(currentNum), prev.innerText.slice(-1)));
            prev.innerText= displayNumber(result.toString()) + e.target.textContent;
            prevNum=result.toString();
            currentNum ='';
            // console.log('prevNum', prevNum, 'currentNum', currentNum);
            // prev.innerText;
            // console.log(prev.innerText);
             current.innerText ='';   
        }
     
        
    })
})
// todo calculate
const calculate = (n1, n2, operand) => {
    let computation;
    switch(operand){
      case '+':
        computation = n1 + n2
        break
      case '-':
        computation = n1 - n2
        break
      case 'x':
        computation = n1 * n2
        break
      case '/':
        computation = n1 / n2
        break
        default:
            return
     
}
return computation;
}
// todo clear button

resetBtn.addEventListener('click', ()=> {
    current.innerText ='';
    prev.innerText='';
    prevNum ='';
    currentNum='';

})

// todo clears up one char button
delBtn.addEventListener('click', (e)=> {
    // console.log(e.target);
    // console.log(prev.innerText);
    // console.log(current.innerText);
    
    // console.log(current.innerText.replace(/,/g,''));
    if(current.innerText !== ''){
        //    const c =current.innerText.replace(/,/,'');
        //    console.log('currentInnerLength', c.length);
        //    console.log(current.innerText.replace(/,/,'').slice(0,-1));
        currentNum = current.innerText.replace(/,/g,'').slice(0,-1);
        // console.log('currentNum', currentNum);
        // console.log(currentNum.length);
     printCurrent(currentNum)
     if(currentNum.length ===0){
         current.innerText='';
         currentNum='';
     }
       
    } 
})

equalsBtn.addEventListener('click', (e)=> {
    // console.log(e.currentTarget);
    // exp unya ra makaclick sa equal button if naay suolod polos na div
    if(prevNum !== '' && currentNum !== ''){
        // console.log('prevInner', prev.innerText, 'prevNum', prevNum);
        // console.log('currentInner', current.innerText, 'currentNum', currentNum);
        currentNum = currentNum.replace(/,/g,"");
        // console.log(prevNum);
        // console.log('current after comma removed',currentNum);
        result = calculate(Number(prevNum), Number(currentNum), prev.innerText.slice(-1));
        // console.log('result:', result);
        // currentNum='';
        // prev.innerText='';
        prev.innerText= prev.innerText + current.innerText +  e.target.textContent;
        // console.log('prevNum', prevNum);
        printCurrent(result.toString());
        //  console.log(current.innerText);
        //  console.log(typeof current.innerText.length);
         adjustFont(current, current.innerText.length)
        // console.log('prevInner', prev.innerText);
        prevNum = result;
        currentNum =prevNum.toString();
        // console.log('currentNum', currentNum);
        // console.log('prevNum', prevNum);
        // console.log(prev.innerText.slice(-1));
        // prev.innerText =displayNumber(prevNum);
       

    }
    
})


// testing purposed only

// const c = '12345678912345678';
// console.log(c.slice(0,16));
// const numbers = [...c.slice(0,16)];
// const str = c.slice(0,16)
// const splitted =[str[0], str.slice(1,4), str.slice(4,7), str.slice(7,10), str.slice(10,13), str.slice(13,16)];
// for(let i=1; i< str.length; i+3){
//     splitted.push(str.slice(i, i+3)) 
// }


// console.log(str.substr(0,1));
// console.log(str.substr(1,3));
// console.log(str.substr(4,3));
// console.log(str.substr(7,3));
// console.log(str.substr(10,3));
// console.log(str.substr(13,3));
// console.log(str.slice(1,4));
// console.log(str.slice(4,7));
// console.log(str.slice(7,10));
// console.log(splitted.join(','));
// console.log(displayNumber(c.slice(0,16)));

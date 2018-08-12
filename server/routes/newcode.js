

let a = [1,2,50,500];
let i = 0;
let Position;
const Size = a.length;

let newArr = [];

function Largest(a) {
  let Largests = a[0];
  for(i=1; i<Size; i++)
  {
    if(Largests<a[i])
    {
      Largests=a[i];
      Position = i;
    }
  }
  return Largests;
}

Sum(a);

function Sum(a) {
  let sum = 0;
  a.forEach(value => {
    if(value !== Largest(a)) {
      sum = sum + value;
    }
  });
  if (sum < Largest(a)) {
    let reduce = reduced(a, Largest(a));
    Sum(reduce);
  }
  else{
    a.forEach(newVal => {
      newArr.push(newVal);
    });
    return a;
  }
}

function reduced(a, largest) {
  let index = a.indexOf(largest);
  a.splice(index,1);
  return a;
}

//

if(newArr.length === 0) {
  console.log('Can not formed');
}
else {
  console.log('Yes, Polygon will form');
  console.log('And the values are');
  newArr.forEach(data => {
    if (data != Largest(a)) {
      console.log(data);
    }
  })
}

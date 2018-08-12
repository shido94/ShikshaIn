let num = 72;
let isPrime;
let i,j;

let factArr = [];
let primeArr = [];
let newArr = [];

for(i=1 ; i< num ; i++) {
  if(num%i === 0) {
    if(i !== 1){
      factArr.push(i);
    }
  }
}

for(i=2; i<=num; i++)
{
  if(num%i === 0)
  {

    isPrime = 1;
    for(j=2; j<=i/2; j++)
    {
      if(i%j === 0)
      {
        isPrime = 0;
        break;
      }
    }


    if(isPrime=== 1)
    {

      primeArr.push(i);
    }
  }
}

console.log(factArr);
console.log(primeArr);

primeArr.forEach(prime => {

  factArr.forEach(fact => {
    if(fact%(prime*prime) !== 0) {
      newArr.push(fact);
    }

    factArr = [];
    newArr.forEach(newAr => {
      factArr.push(newAr)
    });
  });

});

console.log(factArr);

const x = "abc";
const y = [0, 2, 3, 4];
let name = "Christopher";

function IsEven(a) {
  if (a % 2 == 0) return true;
  return false;
}

function DisplayArray(arr) {
  for (i in arr) {
    console.log(`${i}) ${arr[i]}`);
  }
}
console.log("Is number 1 even");
console.log(IsEven(1));

console.log(DisplayArray(["Jan", "Henryk", "Anna"]));


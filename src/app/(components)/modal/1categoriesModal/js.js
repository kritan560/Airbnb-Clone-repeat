const list = ["apple", "banana", "cat", "dog", "egg"];
const list2 = [];

// for (let i = 0; i < list.length; i+=2) {
//     console.log(i)
//     list2.push(list.slice(i, i + 2))
// }

for(let i = 0; i<list.length; i ++){
    if(i%2==0){
        list2.push(list.slice(i, i + 2))
    }
}
// console.log(list);
console.log(list2);

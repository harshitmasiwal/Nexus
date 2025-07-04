let obj = {}

obj.name = "dhruv"
//key , value , writeable , enumrable , configurable

console.log(Object.getOwnPropertyDescriptor(obj,"name"))
// {
//   value: 'dhruv',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

//if we make writable : false then we cannot chainge the value 
//if we make configurable : false then we cannot configure the values of these things
//if we make the enumerable : false then it will not be recognied by the for in loop 
//this is the casue so we arnt able to see the keys like toString and other meathods of any object 

let student = {} 

Object.defineProperty(student , "roll_no", {
    value : 2300320130112,
    writable : false ,
    enumerable : true , 
    configurable : true
})
student.name = "harshit"
student.course = "Btech"
//trying to make some changes in roll_no 
student.roll_no = 2300320130110 //this will not execcuted
console.log(student) //{ roll_no: 2300320130112, name: 'harshit', course: 'Btech' }

//making the enumerable false 

Object.defineProperty(student , "course" , {
    enumerable : false
})

console.log(student) //{ roll_no: 2300320130112, name: 'harshit' }
//now we can see the course feild is vanished but it still exists 
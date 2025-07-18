"use strict";
// about class in typescript
class student {
    constructor(name, age, gender, roll) {
        this.name = name,
            this.age = age,
            this.gender = gender,
            this.roll_no = roll;
    }
}
const stu1 = new student("harshit", 20, "male", 2300320130112);
const stu2 = new student("dhruv", 19, "male", 3784);
console.log(stu1);
console.log(stu2);
//the public , private and protected functionalty is same as the c++ code 
// and also the extends of a suoer class is also same 
class man {
    constructor(name, age) {
        this.name = name,
            this.age = age;
    }
    power() {
        console.log(this.age * 100);
    }
}
class husband extends man {
    constructor(job, salary, name, age) {
        super(name, age), //the super keyword help to initlise the parent properties
            this.profession = job,
            this.salary = salary;
    }
}
const hubby = new husband("enginner", 500000, "harsh", 30);
console.log(hubby);
hubby.power();
//genric template  <T>
function value(a) {
    return a;
}
console.log(value(204));
console.log(value(true));
console.log(value("harshit"));
console.log(value([31, 42, 42, 13, 42]));
// so u see we have to decalre all the expected inputs above in the function 
// but we can fix this using the genric keyword <T>
function updatedval(a) {
    return a;
}
console.log(updatedval(204));
console.log(updatedval(true));
console.log(updatedval("harshit"));
console.log(updatedval([31, 42, 42, 13, 42]));
const a1 = {
    name: "sohan",
    age: 20,
    addhar: 2429282949
};
console.log(a1);
const a2 = {
    name: "sohan",
    age: 20,
    addhar: "092424njr"
};
console.log(a2);
const a3 = {
    name: "haehfheufue",
    age: 20,
    phone: "bfugbbbrbrhbghr",
    email: 943493394034
};
console.log(a3);
const a4 = {
    name: "haehfheufue",
    age: 20,
    phone: 930490490940,
    email: 943493394034
};
console.log(a4);

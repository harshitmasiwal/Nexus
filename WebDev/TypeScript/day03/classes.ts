// about class in typescript

class student {
    name : string 
    age : number 
    gender : string 
    roll_no : number

    constructor(name:string,age:number,gender:string,roll:number){
        this.name = name,
        this.age = age , 
        this.gender = gender , 
        this.roll_no = roll
    }
}

const stu1 = new student("harshit",20,"male",2300320130112)
const stu2 = new student("dhruv",19,"male",3784)
console.log(stu1)
console.log(stu2)



//the public , private and protected functionalty is same as the c++ code 
// and also the extends of a suoer class is also same 

class man {
    name : string ; 
    age : number ; 

    constructor(name:string,age:number){
        this.name = name , 
        this.age  = age
    }

    power() : void{
        console.log(this.age*100)
    }
}

class husband extends man {
    profession : string ;
    salary : number ;

    constructor(job:string,salary:number, name:string , age : number){
        super(name,age),   //the super keyword help to initlise the parent properties
        this.profession = job,
        this.salary = salary
    }

    //this can acess all the public , protected functions of the parent classes
}

const hubby = new husband("enginner",500000,"harsh",30)
console.log(hubby)
hubby.power()



//genric template  <T>

function value(a : number | string | boolean | number[] ) : number | string | boolean | number[]{
    return a;
}

console.log(value(204))
console.log(value(true))
console.log(value("harshit"))
console.log(value([31,42,42,13,42]))

// so u see we have to decalre all the expected inputs above in the function 
// but we can fix this using the genric keyword <T>

function updatedval <T> (a:T):T{
    return a;
}

console.log(updatedval(204))
console.log(updatedval(true))
console.log(updatedval("harshit"))
console.log(updatedval([31,42,42,13,42])) 

//the <T> will get the passed datatype by the user and it assgined to the input and the output

//usage of the genric functions with the interfaces 

interface admin <T> {
    name : string , 
    age : number , 
    addhar : T  // we mention t meanig the value passed by user will be assinged to the addhar it can be number , string or any
}

const a1 : admin<number> =  {
    name : "sohan",
    age : 20, 
    addhar : 2429282949
}

console.log(a1)


const a2 : admin<string> =  {
    name : "sohan",
    age : 20, 
    addhar : "092424njr"
}

console.log(a2)


//also we can make multiple genric type LIKE <T> AND other 

interface last <A,B> {
    name : string , 
    age : number ,
    phone : A , 
    email : B
}

const a3 : last <string,number> = {
    name : "haehfheufue",
    age : 20,
    phone : "bfugbbbrbrhbghr",
    email : 943493394034
}

console.log(a3)


const a4 : last <number,number> = {
    name : "haehfheufue",
    age : 20,
    phone : 930490490940,
    email : 943493394034
}

console.log(a4)

//so this is the end of the typescript


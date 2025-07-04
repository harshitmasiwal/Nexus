//adding new elements in html page using js

// const element = document.createElement("li")
// element.innerHTML = "harshit"

// const par = document.getElementById("list")
// par.appendChild(element)

//i want to append to the list 

// now i can define a easy function for this 

function appendToList(str){
    const element = document.createElement("li")
    element.innerHTML = str

    const parent = document.getElementById("list")
    parent.appendChild(element)
}

appendToList("jiya")
appendToList("hello")
appendToList("example")


// if  we use append then we can append multiple at one time

const root = document.getElementById("root")

const ele1 = document.createElement("div")
ele1.innerHTML = " <i> boss baby </i> "
ele1.style.backgroundColor = "pink"
ele1.style.display = "inline"


const ele2 = document.createElement("div")
ele2.innerHTML = " <i> home sweet home </i> "
ele2.style.backgroundColor = "yellow"
ele2.style.display = "inline"

root.append(ele1 , ele2)

//attching text node to the html doc

const text = document.createTextNode("brgrhruhgruhuhurhrhgrh")
root.append(text)

//creating a attribute 

const id = document.createAttribute("id")
id.value = "first item"

const list_item = document.querySelector("li")
console.log(list_item)

list_item.setAttributeNode(id)


//applying to second element 

const parent = document.getElementById("list")

console.log( parent.children[1] ) //using this we can acess 2nd element or children 

const atr2 = document.createAttribute("name")
atr2.value = "harshit"

parent.children[1].setAttributeNode(atr2)

//acessing attributes of an element 

console.log( parent.children[1].getAttribute("name"))

//easy way is to use setattribute 

parent.children[3].setAttribute("id","third one")
parent.children[3].setAttribute("style","color:red;") 

//removing an attribute 

parent.children[1].removeAttribute("name")

//adding nodes to the dom

const n = document.createElement("li")
n.innerHTML = "harshit is great"
const ref = parent.children[3] 
parent.prepend(n) //adds at the top 
parent.insertBefore(n,ref) 

parent.replaceChild(n,parent.children[6])

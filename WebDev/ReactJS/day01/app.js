//creating a element manually

// const ele = document.createElement('h1')
// ele.innerHTML = "Hello we are going to learn reactjs"
// ele.style.backgroundColor = "black"
// ele.style.color = "white"
// ele.style.fontSize = "30px"

// //taking acess of page
// const doc = document.getElementById("root")
// doc.appendChild(ele)

// // like this if i want to add more things i have to reapeat the code like this

// const ele2 = document.createElement('h1')
// ele2.innerHTML = "i have completed the html css js "
// ele2.style.backgroundColor = "blue"
// ele2.style.color = "white"
// ele2.style.fontSize = "25px"

// //rendring on the page
// doc.appendChild(ele2)

// we can automate this by creating a function ( OWN REACT LIBRARY)

const react = {
  createEle: function (tag, styles, content) {
    const element = document.createElement(`${tag}`);
    if (typeof content === "object") {
      content.forEach((item) => {
        element.append(item)
      });

      for (key in styles) {
        element.style[key] = styles[key];
      }
    } else {
      
      element.innerHTML = content;
      //applying styling
      for (key in styles) {
        element.style[key] = styles[key];
      }
    }

    return element;
  },
};

//function for rendring the element on page

const DOM = {
  render: function (element, parent) {
    const root = document.getElementById(parent);
    root.appendChild(element);
  },
};

// react.createElement("h1",{backgroundColor : "blue" , color : "white" , fontSize : "25px"},"hello guys this is genrated using the react function")

DOM.render(
  react.createEle(
    "h1",
    { backgroundColor: "blue", color: "white", fontSize: "25px" },
    "hello guys this is genrated using the react function"
  ),
  "root"
);

//now if i want to make another element i can just put

DOM.render(
  react.createEle(
    "h2",
    { backgroundColor: "black", color: "white", fontSize: "44px" },
    "so this is the second element which is created using the react function "
  ),
  "root"
);

// now if i want to create a list so i have to modify my createEle function like that

const listItem1 = react.createEle("li", {}, "HTML");
const listItem2 = react.createEle("li", {}, "CSS");
const listItem3 = react.createEle("li", {}, "JS");
const listItem4 = react.createEle("li", {}, "TypeScript");
const list = react.createEle(
  "ul",
  { fontSize: "30px", backgroundColor: "purple", color: "orange" },
  [listItem1, listItem2, listItem3 , listItem4]
);

DOM.render(list , "root")


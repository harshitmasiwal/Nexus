console.log(React)
console.log(ReactDOM)


const header1 = React.createElement("h1",{style: {backgroundColor : 'red' , color : 'white'}},"hello world from react ");

// ReactDOM.render(header1 , document.getElementById('root'));  this is deprictiated in latest react 18 due to a serious issue 

//and now we use 
const displayContainer = ReactDOM.createRoot(document.getElementById('root'))
displayContainer.render(header1)

let content = `
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem commodi dignissimos nam dolore rerum. Voluptas eaque molestiae laborum ab quod recusandae perspiciatis, debitis fugit repudiandae, ipsum quasi nesciunt facere quibusdam temporibus consequatur ullam totam nisi assumenda cum sequi adipisci. Vel soluta tempore accusantium facilis aut est ipsum dolorum! Magni, nulla velit labore distinctio neque et quas nobis ab fugiat similique, incidunt atque laudantium sint doloribus, dolore totam eum inventore maxime beatae. Nisi officia inventore neque iste suscipit molestias quaerat dicta dolor quis quo officiis, necessitatibus magni aperiam dolorum eveniet deleniti perspiciatis fugit obcaecati doloribus autem perferendis! Aperiam, quam? Corrupti, atque?`


const paragraph = React.createElement('p', {style : {backgroundColor : 'black' , color : 'white'}} , content )

//now append it into the page 

const para = ReactDOM.createRoot(document.getElementById('para'))
para.render(paragraph)  
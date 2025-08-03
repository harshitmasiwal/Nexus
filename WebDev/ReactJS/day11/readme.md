//state uplifting

making the passed variable of the parent so it get shared to the children whenever required 
and when we pass parent --> child1 -->>>child2 -->>>child3 -->>>child4 -->>>(child -->>>5)-->
so this is called props drilling
as child5 need props but it is getting passed from all the above childs

to solve the props drilling we store the shared componets in a seprate file which we call as globalcontext or any other name we can create them as many we want 

jo bhi globalcontext.provider ke andar wrap honge sirf usko aur unke grand children ko hi value wala data milega jo provider provide kar rha hai 
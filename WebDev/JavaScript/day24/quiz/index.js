const form = document.getElementById("quizForm")

// const ans = ["Sachin Tendulkar","Australia","Virat Kohli","264","Muttiah Muralitharan"]

const ans = {
    q1 : "Sachin Tendulkar",
    q2 : "Australia",
    q3 : "Virat Kohli",
    q4 : "264",
    q5 : "Muttiah Muralitharan"
}

form.addEventListener( "submit" , (e)=>{
    e.preventDefault()

    const data = new FormData(form)

    console.log(data)
    // const ans_by_user = []
    // for(let ans of data.values()){
    //     // console.log(ans)
    //     ans_by_user.push(ans)
    // }
    // // console.log(ans_by_user)
    // let marks = 0;
    // for(let i = 0 ; i < ans.length ; i++){
    //     if(ans[i] === ans_by_user[i]){
    //         marks++;
    //     }
    // } 
    //the abpve logic will fail if user skips an option then if will get false marks 

    //updated logic 

    let marks = 0 

    for(let [key,value] of data.entries()){
        if(value === ans[key]){
            marks++
        }
    }  //this one is more optimised approach


    const out = document.getElementById("out")
    out.innerHTML = `${marks} out of 5 are correct`

    form.reset()

})
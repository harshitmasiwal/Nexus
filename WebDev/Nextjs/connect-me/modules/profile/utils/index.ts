import db from "@/lib/db";

export const getTempUserNames = async (username : string , count = 3)=>{
    const suggestions : string[] = []

    const rnd = Math.floor(Math.random()*100);

    for(let i = rnd-3 ; i < rnd && suggestions.length < count ; i++){
        const candiate = `${username}${i}`

        const exists = await db.user.findUnique({
            where:{
                username : candiate
            }
        })
        if(!exists){
            suggestions.push(candiate)
        }
    }

    return suggestions;

}
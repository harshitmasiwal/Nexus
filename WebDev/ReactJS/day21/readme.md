link for acessing the resturent details 
https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.6623758&lng=77.37344&carousel=true&third_party_vend






the swiggy will not allow us directly to make his api call so we will use the middleman server and give the error like this 

Access to fetch at 'https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.6623758&lng=77.37344&carousel=true&third_party_vend' from origin 'http://localhost:1234' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

so we will fix the error using the 
cors-anywhere.herokuapp.com

which changes the headers of the swiggy api request and give it to uss 
for using this we just have to attach the link before our request url



name->info->resturents(array)->infoWithStyle-->card->card
data.cards[1].card.card.gridElements.resturents  //data of all the resturents

 


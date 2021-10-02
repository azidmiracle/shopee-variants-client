
let batchnum = 500

let allRatings=[]

for (var i = 0; i < batchnum; ++i) {

fetch(
    `http://localhost:5000/23558781/7660245788/${i}`
  )
.then(response => response.json())
.then((data) => {
  //console.log(data)
  allRatings.push(...data)
  //setTimeout(function(){ console.log(allRatings); }, batchnum*100);
  return allRatings
}).then ((arr)=>console.log(arr))
.catch(function (error) {
  // if there's an error, log it
  console.log(error);
})

}

//setTimeout(function(){ console.log(allRatings); }, batchnum*1500);



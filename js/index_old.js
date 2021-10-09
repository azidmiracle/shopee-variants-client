
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



//back up



let batchnum = 500;

let allRatings = [];
let data = [];
let w = window.innerWidth, h = window.innerHeight;
let margin = {top: 20, right: 20, bottom: h/2, left: 40};

let height = h- margin.top- margin.bottom, width = w - margin.left - margin.right;
for (let i = 0; i < batchnum; ++i) {
  //setTimeout(async function (y) {
  fetch(
    `https://shopee-ratings-variants.herokuapp.com/300449416/3468932619/${i}`
  )
    .then((response) => response.json())
    .then((rawdata) => {
       if (rawdata.length==0){//when there no data end
          //i=batchnum
          //console.log(i)
          return;
       } 
    
      allRatings.push(...rawdata);
      
      data = allRatings.reduce(function (Ratings, rating) {
        if (rating in Ratings) {
          Ratings[rating]++;
        } else {
          Ratings[rating] = 1;
        }

        return Ratings;
      }, {});
      //console.log(data)
      //labels: Object.keys(data)
      let dataset = Object.values(data);
      let sourceNames = Object.keys(data);
      let mod = i % 2;

      if (mod != 0) {
        //Create SVG element
        // xScale will help us set the x position of the bars

        let xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          yScale = d3.scaleLinear().rangeRound([height, 0]);

        xScale.domain(sourceNames);
        yScale.domain([
          0,
          d3.max(dataset, function (d) {
            return d;
          }),
        ]);

        d3.select("svg").remove();

        svg = d3
          .select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h);
        //const svg = d3.select("svg").attr("width", w).attr("height", h);
        svg = svg
          .append("g")
          .attr(
            "transform",
            "translate(" + margin.left + "," + margin.top + ")"
          );

/*          svg
          .append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale)); 
         

 */

        svg
          .append("g")
          .attr("class", "axis axis--y")
          .call(d3.axisLeft(yScale).ticks(5));

        // Create rectangles
        let bars = svg.selectAll(".bar").data(sourceNames).enter().append("g");

        bars
          .append("rect")
          .attr("class", "bar")
          .attr("x", function (d) {
            return xScale(d);
          })
          .attr("y", function (d) {
            return yScale(data[d]);
          })
          .attr("width", xScale.bandwidth())
          .attr("height", function (d) {
            return height - yScale(data[d]);
          });

        bars
          .append("text")
          .text(function (d) {
            return data[d];
          })
          .attr("x", function (d) {
            return xScale(d) + xScale.bandwidth() / 2;
          })
          .attr("y", function (d) {
            return yScale(data[d]) - 5;
          })
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "black")
          .attr("text-anchor", "middle");

          bars
          .append("text")
          .text(function (d) {
            //console.log(d)
            return d;
          })
          .attr("transform", "translate(0," + width + "), rotate(270) ")
          .attr("x", height)
          .attr("y", function (d) {
            
            return xScale(d) + xScale.bandwidth() / 2;
            
          })
          
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "black")
          .attr("text-anchor", "end");

      }
      //console.log(i)
      //console.log(data)
    })
    .catch(function (error) {
      // if there's an error, log it
      console.log(error);
    });
  // }, 300); // we're passing x
}




//https://www.tutorialsteacher.com/d3js/create-svg-chart-in-d3js

let batchnum = 100;

let allRatings = [];
let data = [];
let w = window.innerWidth, h = window.innerHeight;
let margin = {top: 20, right: 20, bottom: h/2, left: 40};

let height = h- margin.top- margin.bottom, width = w - margin.left - margin.right;
for (let i = 0; i < batchnum; ++i) {
  //setTimeout(async function (y) {
  fetch(
    `https://shopee-ratings-variants.herokuapp.com/23558781/7660245788/${i}`
  )
    .then((response) => response.json())
    .then((rawdata) => {
      allRatings.push(...rawdata);
      //console.log(i + allRatings)
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
          .attr("font-size", "14px")
          .attr("fill", "black")
          .attr("text-anchor", "middle");

          bars
          .append("text")
          .text(function (d) {
            //console.log(d)
            return d;
          })
          .attr("transform", "translate(0," + width + "), rotate(270) ")
          .attr("x", function (d) {
            return h/2;
          })
          .attr("y", function (d) {
            
            return xScale(d) + xScale.bandwidth() / 2;
            
          })
          
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "black")
          .attr("text-anchor", "start");

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




    /**working
       xScale = d3
            .scaleBand() //Ordinal scale
            .domain(d3.range(dataset.length)) //sets the input domain for the scale
            .rangeRound([0, w]) //enables rounding of the range
            .paddingInner(0.05); //spacing between each bar

          yScale = d3
            .scaleLinear()
            .domain([0, d3.max(dataset)]) //sets the upper end of the input domain to the largest data value in dataset
            .range([0, h]); 
     * 
     *  //Create SVG element
          // xScale will help us set the x position of the bars
          xScale = d3
            .scaleBand() //Ordinal scale
            .domain(d3.range(dataset.length)) //sets the input domain for the scale
            .rangeRound([0, w]) //enables rounding of the range
            .paddingInner(0.05); //spacing between each bar

          yScale = d3
            .scaleLinear()
            .domain([0, d3.max(dataset)]) //sets the upper end of the input domain to the largest data value in dataset
            .range([0, h]);

          //console.log(dataset.length)
          //d3.select('body').html("")
          d3.select("svg").remove();
          svg = d3
            .select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
          //const svg = d3.select("svg").attr("width", w).attr("height", h);

          //Create bars
          svg
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("width", 0) //start width
            .attr("height", 0) //start height
            .attr("x", function (d, i) {
              // position in x-axis
              return xScale(i); // we will pass the values from the dataset
            })
            .attr("y", function (d) {
              return h - yScale(d);
            })
            .attr("width", xScale.bandwidth()) //Asks for the bandwith of the scale
            .attr("height", function (d) {
              return yScale(d);
            })
            .attr("fill", function (d) {
              return (
                "rgb(" + Math.round(d * 8) + ",0," + Math.round(d * 10*(i+5)) + ")"
              ); //Change the color of the bar depending on the value
            });
     */
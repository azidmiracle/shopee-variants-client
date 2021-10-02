
let batchnum = 2


let allRatings=[]

for (let i = 0; i < batchnum; ++i) {
    setTimeout(async function(y) { 
         fetch(
            `https://shopee-ratings-variants.herokuapp.com/23558781/7660245788/${i}`
        )
        .then(response => response.json())
        .then((data) => {
        
        allRatings.push(...data)
        //console.log(i + allRatings)
        let countedRatings = allRatings.reduce(function (Ratings, rating) {
            if (rating in Ratings) {
                Ratings[rating]++
            }
            else {
                Ratings[rating] = 1
            }
            return Ratings
          }, {})
          //console.log(countedRatings)

         //create chart
         chart = {
            const svg = d3.create("svg")
                .attr("viewBox", [0, 0, width, height]);
            
            const bar = svg.append("g")
                .attr("fill", "steelblue")
              .selectAll("rect")
              .data(data)
              .join("rect")
                .style("mix-blend-mode", "multiply")
                .attr("x", d => x(d.name))
                .attr("y", d => y(d.value))
                .attr("height", d => y(0) - y(d.value))
                .attr("width", x.bandwidth());
            
            const gx = svg.append("g")
                .call(xAxis);
            
            const gy = svg.append("g")
                .call(yAxis);
          
            return Object.assign(svg.node(), {
              update(order) {
                x.domain(data.sort(order).map(d => d.name));
          
                const t = svg.transition()
                    .duration(750);
          
                bar.data(data, d => d.name)
                    .order()
                  .transition(t)
                    .delay((d, i) => i * 20)
                    .attr("x", d => x(d.name));
          
                gx.transition(t)
                    .call(xAxis)
                  .selectAll(".tick")
                    .delay((d, i) => i * 20);
              }
            });
          }

        })
        .catch(function (error) {
        // if there's an error, log it
        console.log(error);
        })
    }, 300); // we're passing x
}

//setTimeout(function(){ console.log(allRatings); }, batchnum*1500);



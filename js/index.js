//get the value in the input boz

let form = document.getElementById("plotGraphForm");

function plotData() {
  //showLoadingModal()
  let txtUrl = document.getElementById("url");
  let txtTop = document.getElementById("top");
  let dropSort = document.getElementById("sortType");
  let url = txtUrl.value;
  let topItems = Number(txtTop.value);
  let sortType = dropSort.value;
  let startChar = url.search("-i.") + 3;
  let endChar = startChar.length;
  let spliceWord = url.slice(startChar, endChar);
  //split the splice word
  let idArr = spliceWord.split(".");

  let shopId = Number(idArr[0]);
  let productId = Number(idArr[1]);
  console.log(topItems);

  //fetch the number of ratings
  fetch(
    `https://shopee-ratings-variants.herokuapp.com/count/${shopId}/${productId}/`
  )
    .then((response) => response.json())
    .then((count) => {
      let batchnum = Math.round(count / 50); // the limit per batch in the server is 50

      let allRatings = [];
      let data = [];
      let w = window.innerWidth,
        h = window.innerHeight;
      let margin = { top: 20, right: 20, bottom: h / 2, left: 40 };

      let height = h - margin.top - margin.bottom,
        width = w - margin.left - margin.right;

      for (let i = 0; i < batchnum + 1; ++i) {
        //setTimeout(async function (y) {
        fetch(
          `https://shopee-ratings-variants.herokuapp.com/ratings/${shopId}/${productId}/${i}`
        )
          .then((response) => response.json())
          .then((rawdata) => {
            allRatings.push(...rawdata);
            
            //create object
            data = allRatings.reduce(function (Ratings, rating) {
              if (rating in Ratings) {
                Ratings[rating]++;
              } else {
                Ratings[rating] = 1;
              }

              return Ratings;
            }, {});

            let dataset = Object.values(data);
            let sourceNames = Object.keys(data);

            let newDataObj = [];
            //create array object so it can be iterable during sorting
            for (x = 0; x < dataset.length; x++) {
              let newObj = {
                name: sourceNames[x],
                value: dataset[x],
              };
              newDataObj.push(newObj);
            }

          
            if(sortType=="asc"){
              // sort by value
            newDataObj.sort(function (a, b) {
              return a.value - b.value;
            });
            }
            else if (sortType=="desc"){
              // sort by value
            newDataObj.sort(function (a, b) {
              return b.value - a.value;
            });
            }

            //get the top items
            let newTopObj=[]
            if (topItems<11){
              newTopObj=newDataObj.slice(0,topItems)
              newDataObj=newTopObj
            }
            //get the sum
            var sum = dataset.reduce(function (a, b) {
              return a + b;
            });
            //console.log(sum)

            let mod = i % 2;

            if (mod != 0) {
              //Create SVG element
              let yScale = d3.scaleLinear().rangeRound([height, 0]);
              yScale.domain([
                0,
                d3.max(dataset, function (d) {
                  return d;
                }),
              ]);

              let xScale = d3
                .scaleBand()
                .domain(newDataObj.map((item) => item.name))
                .rangeRound([0, width])
                .padding(0.1);

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

              svg
                .append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(yScale).ticks(5));

              // Create rectangles
              let bars = svg
                .selectAll(".bar")
                .data(newDataObj)
                .enter()
                .append("g")
                .attr("class", "bars");

              bars
                .append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                  //console.log(xScale(d.name));
                  return xScale(d.name);
                })
                .attr("y", function (d) {
                  return yScale(d.value);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function (d) {
                  return height - yScale(d.value);
                });

              bars
                .append("text")
                .text(function (d) {
                  return d.value;
                })
                .attr("x", function (d) {
                  return xScale(d.name) + xScale.bandwidth() / 2;
                })
                .attr("y", function (d) {
                  return yScale(d.value) - 5;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "white")
                .attr("text-anchor", "middle");

              svg
                .append("g")
                .attr("transform", "translate(0," + height + ")") // This controls the rotate position of the Axis
                .call(d3.axisBottom(xScale))
                .selectAll("text")
                .attr("transform", "translate(-10,10)rotate(-90)")
                .style("text-anchor", "end")
                .style("font-size", "1.15em")
                .style("fill", "white");
            }

          })
          .catch(function (error) {
            // if there's an error, log it
            console.log(error);
          });

        // }, 300); // we're passing x
      }
      //
      //return 0
    });
}

function showLoadingModal() {
  let modalHelp = document.getElementById("modal-loading");
  modalHelp.style.display = "block";
}
function hideLoadingModal() {
  let modalHelp = document.getElementById("modal-loading");
  modalHelp.style.display = "none";
}

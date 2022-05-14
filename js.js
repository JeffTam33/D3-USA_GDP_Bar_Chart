//Babel
//Libaries: D3
//Data used from https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json
const width = 1200;
const height = 550;
const padding = 50;
const circleRadius = 5;

var tooltips = d3.select(".visual-data")
                 .append("div")
                 .attr("id", "tooltip")
                 .attr("class", "tooltips")
                 .style("opacity", 1);

var svgContainer = d3.select(".visual-data")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#FFFFFF");

fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
              .then(response => response.json())
              .then(data =>{
                //Used for finding min and max of said data
                var yearArr = data.map(i => i.Year);
                var timeArr = data.map(i => i.Time);
                //Used for y-axis-data
                var dateObj = timeArr.map(time => {
                  let minute = time.split(":")[0];
                  let seconds = time.split(":")[1];
                  let newDateObj = new Date();
                  return new Date (newDateObj.setMinutes(minute, seconds));
                })
                //Used for position of y-axis data
                timeArr = timeArr.map(time => {
                  let temp = time.split(":")
                  return parseInt(temp[0])*60 + parseInt(temp[1])
                })
                //Scales
                const xScale = d3.scaleLinear()
                                 .domain([d3.min(yearArr) -1, d3.max(yearArr) + 1])
                                 .range([padding, width - padding])
                const yScale = d3.scaleLinear()
                                 .domain([d3.min(timeArr), d3.max(timeArr)])
                                 .range([height - padding, padding])
                //Axises
                const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
                const yAxis = d3.axisLeft(yScale).tickFormat(function(d){
                  let temp = d3.timeFormat('%-M:%-S')(new Date(0).setSeconds(d));
                  if(temp.split(":")[1] === "0"){
                    return temp + "0"
                  }
                  return temp;
                });
                //Call Axis
                svgContainer.append("g")
                            .attr("id", "x-axis")
                            .attr("transform", "translate(0, " + (height - padding) + ")")
                            .call(xAxis);
                svgContainer.append("g")
                            .attr("id", "y-axis")
                            .attr("transform", "translate(" + padding +", 0)")
                            .call(yAxis);
                                //X-axis title
                svgContainer.append("text")
                            .attr("id", "y-axis-title")
                            .attr("x", width / 2)
                            .attr("y", height - (padding / 4))
                            .text("Year");
                //Y-axis title
                svgContainer.append("text")
                            .attr("id", "x-axis-title")
                            .attr("x", (height * -1) + padding * 4)
                            .attr("y", padding / 4)
                            .attr("transform", "rotate(-90)")
                            .text("Time (Minutes:Seconds)");
                //Scatter Plot Data Appear
                svgContainer.selectAll("svg")
                            .data(data)
                            .enter()
                            .append("circle")
                            .attr("class", "dot")
                            .attr("reason", (d, i) => data[i].Doping)
                            .attr("cx", (d, i) => xScale(yearArr[i]))
                            .attr("data-xvalue", (d, i) => yearArr[i])
                            .attr("cy", (d, i) => yScale(timeArr[i]))
                            .attr("data-yvalue", (d, i) => dateObj[i])
                            .attr("r", circleRadius)
                            .on("mouseover", function (event, d){
                              let reason = this.getAttribute("reason");
                              tooltips.transition().duration(0);                             
                              tooltips.attr("id", "legend")
                                      .style("height", "100" + "px")
                                      .style("width", "200" + "px")
                                      .style("top", height - padding + "px")
                                      .style("left", 50 + "px")
                                      .style("opacity", .9)
                                      .style("fill", "#FFFFFF")
                                      .style("transform", "translateX(100px)")
                                      .text(reason);
                            })
                            .on("mouseout", function(){
                              tooltips.transition().duration(100).style("opacity", 0)
                            })
})
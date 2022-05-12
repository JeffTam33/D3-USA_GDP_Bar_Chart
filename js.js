//Babel
//Data used from https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json
const width = 1600;
const height = 530;
const padding = 50;
const barWidth = 5;
//Tool Tips
var tooltips = d3.select(".visual-data")
                 .append("div")
                 .attr("id", "tooltip")
                 .attr("class", "tooltips")
                 .style("opacity", 1)

var svgContainer = d3.select(".visual-data")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#FFFFFF")

fetch("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json")
              .then(response => response.json())
              .then(data => {
                //Scales for x and y axises
                var dataToDateObj = data.data.map(data => new Date(data[0]));
                const xScale = d3.scaleTime()
                                 .domain([d3.min(dataToDateObj), d3.max(dataToDateObj)])
                                 .range([padding, width - padding]);
                const yScale = d3.scaleLinear()
                                 .domain([0, d3.max(data.data, (d) => d[1])])
                                 .range([height - padding, padding]);
                //Position of Axises
                const xAxis = d3.axisBottom(xScale);
                const yAxis = d3.axisLeft(yScale);
                //Call Axis to show on screen
                svgContainer.append("g")
                            .attr("id", "x-axis")
                            .attr("transform", "translate(0, " + (height - padding) + ")")
                            .attr("id", "x-axis")
                            .call(xAxis);
                svgContainer.append("g")
                            .attr("id", "y-axis")
                            .attr("transform", "translate(" + padding +" 0)")
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
                            .attr("x", (height * -1) + padding)
                            .attr("y", padding / 5)
                            .attr("transform", "rotate(-90)")
                            .text("Gross Domestic Product \(USD millions\)");
                //Bar reactangles
                svgContainer.selectAll("svg")
                            .append("rect")
                            .data(data.data)
                            .enter()
                            .append("rect")
                            .style("fill", "#9EE37D")
                            .attr("class", "bar")
                            .attr("index", (d, i) => i)
                            .attr("data-date", (d, i) => data.data[i][0])
                            .attr("data-gdp", (d, i) => data.data[i][1])
                            .attr("x", (d, i) => xScale(dataToDateObj[i]))
                            .attr("y", d => yScale(d[1]))
                            .attr("width", barWidth)
                            .attr("height", d => height - padding - yScale(d[1]))
                            .on("mouseover", function (event, d){
                              let index = this.getAttribute("index");
                              tooltips.transition().duration(0);                             
                              tooltips.attr("data-date", d[0])
                                      .style("height", "25" + "px")
                                      .style("width", "300" + "px")
                                      .style("top", height - padding + "px")
                                      .style("left", index * 5 + "px")
                                      .style("opacity", .9)
                                      .style("fill", "#358600")
                                      .style("transform", "translateX(100px)")
                                      .text(d[0] + " $" + d[1] + "  million")
                            })
                            .on("mouseout", function(){
                              tooltips.transition().duration(100).style("opacity", 0)
                            })
              })
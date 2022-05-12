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
                 .attr("class", "tooltip-hidden")
                 .style("opacity", 0)

var tooltipWrapper = d3.select(".visual-data")
                       .append("div")
                       .attr("class", "tooltip-wrapper")
                       .style("opacity", 0)

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
                            .attr("data-date", (d, i) => data.data[i][0])
                            .attr("data-gdp", (d, i) => data.data[i][1])
                            .attr("x", (d, i) => xScale(dataToDateObj[i]))
                            .attr("y", d => yScale(d[1]))
                            .attr("width", barWidth)
                            .attr("height", d => height - padding - yScale(d[1]))
                            .on("mouseover", function (event, d){
                              tooltipWrapper.transition()
                                            .duration(0)
                                            .style("height", 100)
                                            .style("width", 100)
                                            .style("opacity", .9)
                                            .style("left", 100)
                                            .style("top", 100)
                                            .style("transform", "translateX(50)")
                            })
              })
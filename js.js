//Babel
//Libaries: D3
//Data used from https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json
const width = 1200;
const height = 550;
const padding = 50;

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
                timeArr = timeArr.map(time => {
                  let temp = time.split(":")
                  return parseInt(temp[0])*60 + parseInt(temp[1])
                })
                //Scales
                const xScale = d3.scaleLinear()
                                 .domain([d3.min(yearArr), d3.max(yearArr) + 1])
                                 .range([padding, width - padding])
                const yScale = d3.scaleLinear()
                                 .domain([minS, maxS])
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
                
})
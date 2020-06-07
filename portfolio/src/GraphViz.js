import React, {Component} from 'react'; 
var d3 = require("d3");

const data = 
{
    nodes: [
        {
            name: "Annie",
            group: 1
        },
        {
            name: "Bai",
            group: 2
        },
        {
            name: "Andy",
            group: 1
        },
        {
            name: "Wu",
            group: 2
        }
    ],
    links: [
        {
            source: 1,
            target: 0,
            value: 1
        },
        {
            source: 1, 
            target: 2,
            value: 1
        },
        {
            source: 3,
            target: 2,
            value: 1
        }
    ]

}

const movie_indices =
{
    Avengers: 0,  
}

const ACTOR = 1;
const MOVIE = 2;



// foreach actor 
    // push into links itself's index and the movie's index

// use movie_indices to check if we already 
class GraphViz extends Component 
{
    constructor(props)
    {
        super(props);
        console.log("==== GRAPHVIZ ====");

        var list = this.props.list;
        var movies = this.props.movies;
        
        this.links = [];
        this.nodes = [];
        const allActors = {};
        this.content = {};
        list.forEach((item) => 
        {
            if (movies[item] !== undefined)
            {
                var data = movies[item];
                this.content[item] = data; 

                // add movie as new node 
                var newMovieNode = {};
                newMovieNode["name"] = data.title;
                newMovieNode["group"] = MOVIE; 
                newMovieNode["image"] = data.filename;
                this.nodes.push(newMovieNode);
                var movieIndex = this.nodes.length - 1;

                var actors = data.actors.split(",");
                actors.forEach((item) => {
                    var name = item.trim();
                    var actorIndex = -1;

                    // add actor if new
                    if (allActors[name] !== undefined)
                    {
                        actorIndex = allActors[name];
                    }
                    else 
                    {
                        console.log("Adding..." + name);
                        console.log(allActors);
                        // add actor as a new node
                        var newActorNode = {}; 
                        newActorNode["name"] = name; 
                        newActorNode["group"] = ACTOR;
                        this.nodes.push(newActorNode);

                        // get the actor's index
                        actorIndex = this.nodes.length - 1;
                        // record it 
                        allActors[name] = actorIndex;
                    }

                    // link actor to the movie 
                    var newLink = {};
                    newLink["source"] = actorIndex;
                    newLink["target"] = movieIndex; 
                    newLink["value"] = 1;
                    this.links.push(newLink);
                });
            }
        });

    
        console.log(this.content);
        console.log(this.links);
        console.log(this.nodes);
    }

    drag = (simulation) => {
        function dragStarted(d) {
            if (!d3.event.active) 
            {
                simulation.alphaTarget(0.3).restart();
            }
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if (!d3.event.active)
            {
                simulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }
        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    }

    chart(nodes, links)
    {
        const width = 1920;
        const height = 1080;
        const obj_nodes = nodes.map(d => Object.create(d));
        const obj_links = links.map(d => Object.create(d));

        const svg = d3.create("svg")
            .attr("viewBox", [0,0, width, height]);
        
        const defs = svg.append('svg:defs');
    
        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", d => Math.sqrt(d.value));
        
        const color = (node) => {
            if (node.group === ACTOR) // it's a name 
            {
                return d3.color("steelblue");
            }
            return d3.color("pink");
        }

        const radius = (node) => {
            if (node.group == ACTOR)
            {
                return 50;
            }
            return 100;
        }

        const name = (node) => {
            return node.name;
        }

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink()
                            .links(links)
                            .id(d => {return d.index;}).distance(200)) // forces links to bounce back after dragging
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));
        
        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", radius)
            .style("fill", color)
            .call(this.drag(simulation));

        simulation.on("tick", () => {
            link 
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node 
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });
        
        return svg.node();
    }

    componentDidMount()
    {
        const elem = document.getElementById("mysvg");
        elem.appendChild(this.chart(this.nodes, this.links));
    }

    render()
    {
        return(
                <div id="mysvg">

                </div>);
    }

}

export default GraphViz;
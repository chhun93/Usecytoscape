import cytoscape from "cytoscape";
import "./style.css";

const createClick = () => {
  var fromText = document.getElementById("from").value;
  var toText = document.getElementById("to").value;

  
};

document.querySelector("#btnCreate").addEventListener("click", createClick);

var cy = cytoscape({
  container: document.getElementById("cy"),

  elements: [
    {
      data: { id: "a" },
    },
    {
      data: { id: "b" },
    },
    {
      data: { id: "ab", source: "a", target: "b" },
    },
    {
      data: { id: "c" },
    },
    {
      data: { id: "ac", source: "a", target: "c" },
    },
  ],

  style: [
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(id)",
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "curve-style": "bezier",
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
      },
    },
  ],

  layout: {
    name: "cose",
  },
});

import cytoscape from "cytoscape";
import "./style.css";

var nodeCount = 1;
var clickedNode = "";

var cy = cytoscape({
  container: document.getElementById("cy"),

  elements: [{ data: { id: "1", label: "ROOT" } }],

  style: [
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(label)",
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

cy.on("click", "node", function (evt) {
  clickedNode = this.nodes();

  var updateInputId = document.getElementById("nodeId");
  updateInputId.value = clickedNode.id();
  var fromInputId = document.getElementById("fromId");
  fromInputId.value = clickedNode.id();

  var updateInputLabel = document.getElementById("nodeLabel");
  updateInputLabel.value = clickedNode.label;
  var fromInputLabel = document.getElementById("fromLabel");
  fromInputLabel.value = clickedNode.label;

  document.getElementsByClassName("update_input_box")[0].style.display = "";
});

const updateClick = () => {
  if (clickedNode === "") return;

  clickedNode = "";
};

const createClick = () => {
  nodeCount++;
  var fromText = document.getElementById("fromLabel").value;
  var toText = document.getElementById("toLabel").value;

  var fromId = document.getElementById("fromId").value;

  if (fromText === "" || toText === "") return;

  document.getElementById("toId").value = nodeCount;
  var toId = document.getElementById("toId").value;

  cy.add([
    { group: "nodes", data: { id: `${toId}`,label:`${toText}` } },
    {
      group: "edges",
      data: { id: `${fromId}${toId}`, source: fromId, target: toId },
    },
  ]);
  const layout = cy.layout({
    name: "cose",
  });

  layout.run();

  document.getElementsByClassName("update_input_box").style.display="none";
  fromId="";
  toId="";
  fromText="";
  toText="";
};

document.querySelector("#btnCreate").addEventListener("click", createClick);
document.querySelector("#btnUpdate").addEventListener("click", updateClick);

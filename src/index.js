import cytoscape from "cytoscape";
import "./style.css";

var nodeCount = 1;
var clickedNode = "";

var cy = cytoscape({
  container: document.getElementById("cy"),

  elements: [{ data: { id: "node1", label: "ROOT" } }],

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
  console.log(clickedNode);
  var fromInputId = document.getElementById("fromId");
  fromInputId.value = clickedNode.id();
  var updateInputId = document.getElementById("nodeId");
  updateInputId.value = clickedNode.id();

  var fromInputLabel = document.getElementById("fromLabel");
  fromInputLabel.value = clickedNode.data("label");
  var updateInputLabel = document.getElementById("nodeLabel");
  updateInputLabel.value = clickedNode.data("label");

  document.getElementsByClassName("update_input_box")[0].style.display = "";
});

const cleanInput=()=>{
  document.getElementsByClassName("update_input_box")[0].style.display = "none";

  document.getElementById("fromLabel").value = "";
  document.getElementById("toLabel").value = "";
  document.getElementById("fromId").value = "";
  document.getElementById("toId").value = "";

  clickedNode = "";
}

const updateClick = () => {
  if (clickedNode === "") return;

  var updateInputLabel = document.getElementById("nodeLabel");
  clickedNode.data("label", `${updateInputLabel.value}`);

  cleanInput();
  const layout = cy.layout({
    name: "cose",
  });

  layout.run();
  
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
    { group: "nodes", data: { id: `node${toId}`, label: `${toText}` } },
    {
      group: "edges",
      data: {
        id: `edge_${fromId}_${toId}`,
        source: fromId,
        target: `node${toId}`,
      },
    },
  ]);
  const layout = cy.layout({
    name: "cose",
  });

  layout.run();

  cleanInput();
};
const deleteClick = () => {
  if(clickedNode==="")
    return;
  cy.remove(clickedNode);
  
  const layout = cy.layout({
    name: "cose",
  });
  layout.run();
  cleanInput();
};

document.querySelector("#btnCreate").addEventListener("click", createClick);
document.querySelector("#btnDelete").addEventListener("click", deleteClick);
document.querySelector("#btnUpdate").addEventListener("click", updateClick);

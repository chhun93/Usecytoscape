import cytoscape from "cytoscape";
import "./style.css";

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
  console.log(clickedNode);
  console.log(clickedNode.data.label);
  var updateInput = document.getElementById("nodeId");
  updateInput.value = clickedNode.id();
});

const updateClick = () => {
  if (clickedNode === "") return;

  var updateInput = document.getElementById("nodeId");
  updateInput.value = clickedNode.label();

  clickedNode = "";
  updateInput.value = "";
};

const createClick = () => {
  const fromText = document.getElementById("from").value;
  const toText = document.getElementById("to").value;

  if (fromText === "" || toText === "") return;
  var chk = false;

  for (var i in cy.nodes) {
    console.log(i);
    console.log(cy.nodes[i]);
  }
  if (chk) {
    cy.add([
      { group: "nodes", data: { id: `${toText}` } },
      {
        group: "edges",
        data: { id: `${fromText}${toText}`, source: fromText, target: toText },
      },
    ]);
    const layout = ct.layout({
      name: "cose",
    });
    layout.run();
  } else {
    alert("잘못된 입력입니다.");
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    return;
  }
};

document.querySelector("#btnCreate").addEventListener("click", createClick);
document.querySelector("#btnUpdate").addEventListener("click", updateClick);

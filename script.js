const originalData = [
  {
    name: { content: "Vitor Mezzalira", type: 'text' },
    age: { content: 20, type: 'number' }
  },
  {
    name: { content: "Samanta Mezzalira", type: 'text' },
    age: { content: 24, type: 'number' }
  },
  {
    name: { content: "Fernanda Mezzalira", type: 'text' },
    age: { content: 24, type: 'number' }
  },
  {
    name: { content: "Debora Mezzalira", type: 'text' },
    age: { content: 25, type: 'number' }
  },
  {
    name: { content: "Eduardo Zaparoli", type: 'text' },
    age: { content: 19, type: 'number' }
  },
  {
    name: { content: "Ivonir Mezzalira", type: 'text' },
    age: { content: 61, type: 'number' }
  },
  {
    name: { content: "Eucadia Mezzalira", type: 'text' },
    age: { content: 53, type: 'number' }
  },
  {
    name: { content: "Douglas Costa", type: 'text' },
    age: { content: 31, type: 'number' }
  },
];

class Table {
  constructor(data, bodyElement) {
    this.data = data;
    this.bodyElement = bodyElement;
    this.sortTypeName = 'alphabetic';
    this.sortTypeAge = 'growing';
  }
  // cosntrui o conteúdo da tabela seguindo a sequência do array
  buildTableBody() {
    const data = this.data;
    function createRow(data) {
      const row = document.createElement("TR");
      row.appendChild(createRowCell(data.name.content));
      row.appendChild(createRowCell(data.age.content));
      return row;
    }
    function createRowCell(content) {
      const cell = document.createElement("TD");
      const cellContent = document.createTextNode(content);
      cell.appendChild(cellContent);
      return cell;
    }
    this.bodyElement.innerHTML = "";
    data.forEach((item) => {
      this.bodyElement.appendChild(createRow(item));
    });
  }

  // troca os tipos de ordenação
  chosseSortType(column) {
    switch (column) {
      // for texts
      case "name":
        switch (this.sortTypeName) {
          case "alphabetic":
            this.sortTypeName = "anti-alphabetic";
            this.sortAntiAlphabetically();
            break
          case "anti-alphabetic":
            this.sortTypeName = "alphabetic";
            this.sortAlphabetically();
            break
        }
        break
      // for numbers
      case "age":
        switch (this.sortTypeAge) {
          case "growing":
            this.sortTypeAge = "decreasing";
            this.sortDecreasing();
            break
          case "decreasing":
            this.sortTypeAge = "growing";
            this.sortGrowing();
            break
        }
        break
    }
  }

  // for texts
  // ordena o array de forma alfabética pela primeira coluna
  sortAlphabetically() {
    this.data.sort((a, b) => {
      if (a.name.content < b.name.content) return -1;
      if (a.name.content > b.name.content) return 1;
      return 0;
    });
    this.buildTableBody();
  }

  // ordena o array de forma anti-alfabética pela primeira coluna
  sortAntiAlphabetically() {
    this.data.sort((a, b) => {
      if (a.name.content < b.name.content) return 1;
      if (a.name.content > b.name.content) return -1;
      return 0;
    });
    this.buildTableBody();
  }

  // for numbers
  // ordena o array de forma crescente pela segundo coluna
  sortGrowing() {
    this.data.sort((a, b) => {
      if (a.age.content < b.age.content) return -1;
      if (a.age.content > b.age.content) return 1;
      return 0;
    });
    this.buildTableBody();
  }

  // ordena o array de forma decrescente pela segundo coluna
  sortDecreasing() {
    this.data.sort((a, b) => {
      if (a.age.content < b.age.content) return 1;
      if (a.age.content > b.age.content) return -1;
      return 0;
    });
    this.buildTableBody();
  }
}

let table = new Table(
  originalData,
  document.getElementById("table-body")
);
table.sortAlphabetically();

document.getElementById("name").addEventListener("click", () => {
  table.chosseSortType('name');
});

document.getElementById("age").addEventListener("click", () => {
  table.chosseSortType('age');
});
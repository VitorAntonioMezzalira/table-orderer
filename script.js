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

// for columns with text content
class TableTextColumn {
  constructor(columnName, columnHeaderElement) {
    this.columnName = columnName;
    this.columnHeaderElement = columnHeaderElement;
    this.contentType = 'text';
    this.sortType = 'alphabetic';
  }
  chosseSortType() {  
    // for texts
    switch (this.sortType) {
      case "alphabetic":
        this.sortType = "anti-alphabetic";
        this.sortAntiAlphabetically(this.columnName);
        break
      case "anti-alphabetic":
        this.sortType = "alphabetic";
        this.sortAlphabetically(this.columnName);
        break
    }
  }
  // ordena o array de forma alfabética pela primeira coluna
  sortAlphabetically(columnName) {
    table.data.sort((a, b) => {
      if (a[columnName].content < b[columnName].content) return -1;
      if (a[columnName].content > b[columnName].content) return 1;
      return 0;
    });
    table.buildTableBody();
  }
  // ordena o array de forma anti-alfabética pela primeira coluna
  sortAntiAlphabetically(columnName) {
    table.data.sort((a, b) => {
      if (a[columnName].content < b[columnName].content) return 1;
      if (a[columnName].content > b[columnName].content) return -1;
      return 0;
    });
    table.buildTableBody();
  }
}

// for columns with number content
class TableNumberColumn {
  constructor(columnName, columnHeaderElement) {
    this.columnName = columnName;
    this.columnHeaderElement = columnHeaderElement;
    this.contentType = 'number';
    this.sortType = 'growing';
  }
  chosseSortType() {
    // for texts
    switch (this.sortType) {
      case "growing":
        this.sortType = "decreasing";
        this.sortDecreasing(this.columnName);
        break
      case "decreasing":
        this.sortType = "growing";
        this.sortGrowing(this.columnName);
        break
    }
  }
  // ordena o array de forma crescente pela segundo coluna
  sortGrowing(columnName) {
    table.data.sort((a, b) => {
      if (a[columnName].content < b[columnName].content) return -1;
      if (a[columnName].content > b[columnName].content) return 1;
      return 0;
    });
    table.buildTableBody();
  }

  // ordena o array de forma decrescente pela segundo coluna
  sortDecreasing(columnName) {
    table.data.sort((a, b) => {
      if (a[columnName].content < b[columnName].content) return 1;
      if (a[columnName].content > b[columnName].content) return -1;
      return 0;
    });
    table.buildTableBody();
  }
}

// !!! IMPORTANTE !!! fazer com que a instanciação das classes seja dinâmica
const columnNames = new TableTextColumn(
  "name",
  document.getElementById('name')
);
columnNames.columnHeaderElement.addEventListener('click', () => {
  columnNames.chosseSortType()
})
const columnAges = new TableNumberColumn(
  "age",
  document.getElementById('age')
);
columnAges.columnHeaderElement.addEventListener('click', () => {
  columnAges.chosseSortType()
})


class Table {
  constructor(data, bodyElement) {
    this.data = data;
    this.bodyElement = bodyElement;
    this.sortTypeName = 'alphabetic';
    this.sortTypeAge = 'growing';
  }
  // monta o conteúdo da tabela seguindo a sequência do array
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
}
let table = new Table(
  originalData,
  document.getElementById("table-body")
);
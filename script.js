const data = {
  columnsNames: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'number' },
    { name: 'weight', type: 'number' }

  ],
  content: [
    {
      name: "Vitor Mezzalira",
      age: 20,
      weight: 1.76
    },
    {
      name: "Samanta Mezzalira",
      age: 24,
      weight: 1.67
    },
    {
      name: "Fernanda Mezzalira",
      age: 24,
      weight: 1.65
    },
    {
      name: "Debora Mezzalira",
      age: 25,
      weight: 1.73
    },
    {
      name: "Eduardo Zaparoli",
      age: 19,
      weight: 1.80
    },
    {
      name: "Ivonir Mezzalira",
      age: 61,
      weight: 1.85
    },
    {
      name: "Eucadia Mezzalira",
      age: 52,
      weight: 1.74
    },
    {
      name: "Douglas Costa",
      age: 31,
      weight: 1.79
    }
  ]
};

// --------------- || ---------------

// para colunas com conteúdo de texto
class TableTextColumn {
  constructor(columnName, columnHeaderElement) {
    this.columnName = columnName;
    this.columnHeaderElement = columnHeaderElement;
    this.sortType = 'alphabetic';
  }
  chosseSortType() {
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
  // ordena o array de forma alfabética
  sortAlphabetically(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });
    table.buildTableBody();
  }
  // ordena o array de forma anti-alfabética
  sortAntiAlphabetically(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return 1;
      if (a[columnName] > b[columnName]) return -1;
      return 0;
    });
    table.buildTableBody();
  }
}

// --------------- || ---------------

// para colunas com conteúdo de valores numéricos
class TableNumberColumn {
  constructor(columnName, columnHeaderElement) {
    this.columnName = columnName;
    this.columnHeaderElement = columnHeaderElement;
    this.sortType = 'growing';
  }

  chosseSortType() {
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

  // ordena o array de forma crescente
  sortGrowing(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });
    table.buildTableBody();
  }

  // ordena o array de forma decrescente
  sortDecreasing(columnName) {
    table.data.content.sort((a, b) => {
      if (a[columnName] < b[columnName]) return 1;
      if (a[columnName] > b[columnName]) return -1;
      return 0;
    });
    table.buildTableBody();
  }
}

// --------------- || ---------------


class Table {
  constructor(data, tableElement) {
    this.data = data;
    this.tableElement = tableElement;
    this.tableHeader = '';
    this.tableBody = '';
    this.columns = [];
  }

  generateTable() {
    this.buildTable();
    this.buildTableHeader();
    this.buildTableBody();
    this.createColumnsClasses();
  }

  createColumnsClasses() {
    // instancia as classes de acordo com o tipo de dado da coluna
    this.data.columnsNames.forEach(columnName => {
      switch (columnName.type) {
        case 'string':
          this.columns.push(new TableTextColumn(
            columnName.name,
            document.getElementById('table-orderer-' + columnName.name)
          ))
          break
        case 'number':
          this.columns.push(new TableNumberColumn(
            columnName.name,
            document.getElementById('table-orderer-' + columnName.name)
          ))
          break
      }
    })
    // cria o evento no header da coluna para alterar a ordenação 
    this.columns.forEach(column => {
      column.columnHeaderElement.addEventListener('click', () => {
        column.chosseSortType()
      })
    })
  }

  // monta o thead e o tbody da tabela
  buildTable() {
    this.tableElement.innerHtml = '';
    const tableHeader = document.createElement('THEAD');
    tableHeader.setAttribute('id', 'table-orderer-header');
    this.tableHeader = tableHeader;
    this.tableElement.appendChild(tableHeader);

    const tableBody = document.createElement('TBODY');
    tableBody.setAttribute('id', 'table-orderer-body');
    this.tableBody = tableBody;
    this.tableElement.appendChild(tableBody);
  }

  // monta o cabeçalho da tabela
  buildTableHeader() {
    this.tableHeader.innerHtml = '';
    const headerRow = document.createElement('TR');
    this.data.columnsNames.forEach(columnName => {
      const headerCell = document.createElement('TH');
      headerCell.setAttribute('id', 'table-orderer-' + columnName.name);
      const headerCellContent = document.createTextNode(columnName.name);
      headerCell.appendChild(headerCellContent);
      headerRow.appendChild(headerCell);
    })
    this.tableHeader.appendChild(headerRow);
  }

  // monta o conteúdo da tabela
  buildTableBody() {
    this.tableBody.innerText = '';
    this.data.content.forEach(item => {
      const bodyRow = document.createElement('TR');
      this.data.columnsNames.forEach(columnName => {
        const bodyRowCell = document.createElement('TD');
        const bodyRowCellContent = document.createTextNode(item[columnName.name]);
        bodyRowCell.appendChild(bodyRowCellContent);
        bodyRow.appendChild(bodyRowCell);
      })
      this.tableBody.appendChild(bodyRow);
    })
  };
};
// --------------- || ---------------

let table = new Table(
  data,
  document.getElementById("table-orderer"),
);
table.generateTable();
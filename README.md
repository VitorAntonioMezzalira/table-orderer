# Table Orderer

## Tutorial

### Data Structure

```
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
      name: "Douglas Costa",
      age: 31,
      weight: 1.72
    },
  ]
};
```

- Data.ColumnsNames must have the same names as the data.content;
- The available data.types are numbers and string, in future updates date type will be at disposal


### Class Call

```
let table = new Table(
  data,
  document.getElementById("table-orderer"),
);
table.generateTable()
```


## To Do

[o] Unificar função que ordena strings e números em uma só função
[o] Criar ordenação para datas
[x] Deselvolver forma para a Classe Table instanciar de forma dinâmica cada coluna na classe correspondente ao seu tipo de conteúdo

### Others

- Criar paginação para a tabela
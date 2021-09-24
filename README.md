# Table Orderer

## Tutorial

### Data

<code>
const columnsNames = ['name', 'age']
const data = [
  {
    name: { content: "Douglas Costa", type: 'text' },
    age: { content: 31, type: 'number' }
  },
  {
    name: { content: "Everton Souza Soares", type: 'text' },
    age: { content: 25, type: 'number' }
  },
]
</code>

### Class Call

<code>
let table = new Table(
  data,
  document.getElementById("table-body"),
  columnsNames
);
table.CreateColumnsClasses()
</code>

## To Do

- Unificar função que ordena strings e números em uma só função
- Criar ordenação para datas
- Deselvolver forma para a Classe Table instanciar de forma dinâmica cada coluna na classe correspondente ao seu tipo de conteúdo

### Others

- Criar paginação para a tabela
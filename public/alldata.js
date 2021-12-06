function priceFormatter(cell, row){
  return '$' + Number(cell).toFixed(2);
}

function Table() {
  const [data, setData] = React.useState([]);    

  React.useEffect(() => {
      // fetch all accounts from API (/public/index.js)
      fetch('/account/all')
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setData(data);                
          });
  }, []);

  return (
    <BootstrapTable
        data={data}
        bodyStyle={{ border: "none" }}
        tableStyle={{ border: "none" }}
        headerStyle={{ border: "none !important" }}
        striped
        version="4"
        height="500"
    >
      <TableHeaderColumn isKey dataField={'name'}>
        Name
      </TableHeaderColumn>
      <TableHeaderColumn dataField={'email'}>
        Email
      </TableHeaderColumn>
      <TableHeaderColumn dataField={'uid'}>
        Firebase UID
      </TableHeaderColumn>
      <TableHeaderColumn dataField={'balance'} dataFormat={priceFormatter}>
        Balance
      </TableHeaderColumn>
    </BootstrapTable>
  );
}

function AllData() {
  return (
    <>
      <h1>All Data</h1>
      <Card
        txtcolor="black"
        header={'All Bank Accounts'}
        body={<Table/>}
      />
    </>
  );
}
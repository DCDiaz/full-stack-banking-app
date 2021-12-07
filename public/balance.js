function Balance() {
  return (
    <Card
      txtcolor="black"
      header="Account Balance"
      body={<BalanceForm/>}
    />
  )
}

function BalanceForm(props) {
  const ctx = React.useContext(UserContext);  
  const email = ctx.user.email;
  const [balance, setBalance] = React.useState(0);  

  fetch(`/account/findOne/${email}`)
  .then(response => response.text())
  .then(text => {
      try {
          const data = JSON.parse(text);
          setBalance(data.balance);
      } catch(err) {
          console.log('err:', text);
      }
  });

  return (<>
    <h5>Your current balance is ${parseFloat(balance).toFixed(2)}</h5>
  </>);
}
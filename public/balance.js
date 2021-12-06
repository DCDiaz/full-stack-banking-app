function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      txtcolor="black"
      header="Account Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){

  const ctx = React.useContext(UserContext);  

  const [email, setEmail]     = React.useState(ctx.user.email);
  const [balance, setBalance] = React.useState(0);  

  fetch(`/account/findOne/${email}`)
  .then(response => response.text())
  .then(text => {
      try {
          const data = JSON.parse(text);
          //props.setStatus(text);
          //props.setShow(false);
          setBalance(data.balance);
          console.log('JSON:', data);
      } catch(err) {
          props.setStatus(text)
          console.log('err:', text);
      }
  });

  return (<>

    <h5>Your balance is ${parseFloat(balance).toFixed(2)}</h5>

    {/*Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
    onChange={e => setEmail(e.currentTarget.value)}/><br/>*/}

    {/*<button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
  </button>*/}

  </>);
}
function Home() {
  return (
    <>
      <h1>Welcome to First National Online Bank</h1>
      <Card
        txtcolor="black"
        header="We're First in Bad Banking!"
        title="First National Bad Bank is here for all of your bad banking needs."
        text="Through our web app, you can open an account, and then deposit and withdraw funds from your account. (Disclaimer: First National Bad Bank is *not* FDIC insured. Deposit your funds at your own risk.)"
        body={(
          <>
            <p className="text-center"><img src="./broken-piggy-bank.jpg" className="img-fluid" alt="Bank logo"/></p>
            <p>Photo from <a href="https://pixabay.com/photos/money-piggy-bank-finance-save-up-4902545/" target="_blank" rel="noreferrer">Pixabay.com</a></p>
          </>
          )}
      /> 
    </> 
  );  
}

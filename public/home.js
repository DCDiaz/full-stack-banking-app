function Home() {
  return (
    <>
      <h1>Welcome to First National Online Bank</h1>
      <Card
        txtcolor="black"
        header="We're First in Online Banking!"
        title="First National Online Bank is here for all of your online banking needs."
        text="Through our web app, you can open an account, and then deposit and withdraw funds from your account."
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

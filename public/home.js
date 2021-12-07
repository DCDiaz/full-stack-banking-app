function Home() {
  return (
    <>
      <Card
        txtcolor="black"
        header="Welcome to The Full-Stack Bank"
        title="The Full-Stack Bank is here to help you solve your financial puzzle."
        text="Through our web app, you can open an account, and then deposit and withdraw funds from your account."
        body={(
          <>
            <p className="text-center"><img src="./financial-puzzle.jpg" className="img-fluid" alt="Bank logo"/></p>
            <p>Royalty-Free Photo from <a href="https://pixabay.com/photos/puzzle-money-business-finance-2500328/" target="_blank" rel="noreferrer">Pixabay.com</a></p>
          </>
          )}
      /> 
    </> 
  );  
}

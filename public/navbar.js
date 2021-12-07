function NavBar() {

  function handleLogout() {
    firebase.auth().signOut()
      .then (() => {
        let homeLinkAnchor = document.getElementById('homeLinkAnchor');
        homeLinkAnchor.click();
      });
  }
   
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary stroke">
      <div className="container-xl">
        <a className="navbar-brand fw-bold"><img className="mr-2" src="./bank.png" alt="Bank logo"/>Full-Stack Bank</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-3" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item" id="homeLink">
              <a className="nav-link" id="homeLinkAnchor" href="#/">Home</a>
            </li>
            <li className="nav-item" id="createLink">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
            <li className="nav-item" id="balanceLink" style={{display: 'none'}}>
              <a className="nav-link" href="#/balance/">Balance</a>
            </li>
            <li className="nav-item" id="depositLink" style={{display: 'none'}}>
              <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item" id="withdrawLink" style={{display: 'none'}}>
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            {/*<li className="nav-item" id="dataLink">
              <a className="nav-link" href="#/AllData/">All Data</a>
            </li>*/} 
            <li className="nav-item" id="loginLink">
              <a className="nav-link fw-bold" href="#/login/">Log In</a>
            </li> 
            <li className="nav-item" id="logoutLink" style={{display: 'none'}}>
              <a className="nav-link cursor-pointer fw-bold" onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
        <div className="float-end">
          <span className="fw-bold mt-1 text-white" id="loggedInStatus">No User</span>
        </div>
      </div>
    </nav>
  );
}
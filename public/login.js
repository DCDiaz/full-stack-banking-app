function Login() {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      txtcolor="black"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginForm(props) {

  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  // get elements
  const emailInput    = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const status        = document.getElementById('loggedInStatus');	

  /*function handle() {
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }*/

  function handleEmailAndPassword() {
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(
      emailInput.value,
      passwordInput.value
    );
    promise.catch((e) => console.log(e.message));
  }

  function handleGoogle() {
    // log in with Google
    console.log("google sign in clicked");
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        status.innerHTML = 'You are logged in using the following email: ' + user.email;
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.email;
        // ...
    });
  }

  function handleLogout() {
    console.log("logout clicked");
    firebase.auth().signOut();
  }

  // login state
  firebase.auth().onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      console.log(firebaseUser);
      loggedInStatus.innerText = "Logged-In";
      //logout.style.display = "inline";
      //login.style.display = "none";
      //signup.style.display = "none";
      //email.style.display = "none";
      //password.style.display = "none";
      //googlelogin.style.display = "none";
    } else {
      console.log("User is not logged in");
      loggedInStatus.innerText = "Logged-Out";
      //login.style.display = "inline";
      //signup.style.display = "inline";
      //email.style.display = "inline";
      //googlelogin.style.display = "inline";
      //password.style.display = "inline";
      //logout.style.display = "none";
    }
  });

  return (<>
    Email<br/>
    <input type="input" 
      className="form-control" 
      id="emailInput"
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      id="passwordInput"
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary"
      id="loginButton" 
      onClick={handleEmailAndPassword}>Login</button>

    <button 
      className="btn btn-primary ml-2"
      id="googleButton"
      onClick={handleGoogle}>Google Login</button>

    <button
      className="btn btn-primary ml-2"
      id="logoutButton"
      onClick={handleLogout}>Logout</button>
  </>);
}


function LoginMsg(props) {
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}
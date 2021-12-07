function Login() {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(false);    

  return (
    <Card
      txtcolor="black"
      header="Login to Your Account"
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
  
  const ctx = React.useContext(UserContext);  

  // get elements
  const emailInput     = document.getElementById('emailInput');
  const passwordInput  = document.getElementById('passwordInput');

  function handleEmailAndPassword() {
    firebase.auth().signInWithEmailAndPassword(
      emailInput.value,
      passwordInput.value
    )
    .then((user) => { 
      props.setShow(false);
      props.setStatus(true);
      ctx.user.email = emailInput.value;
    })
    .catch((e) => console.log(e.message));
  }

  function handleGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        const user = result.user;
        console.log(user);
        props.setShow(false);
        props.setStatus(true);
        ctx.user.email = user.email;
        console.log(ctx);
        // check if user exists in mongodb
        fetch(`/account/findOne/${user.email}`)
          .then(response => response.text())
          .then(text => {
              try {
                const data = JSON.parse(text);
                //console.log('JSON:', data);
              } catch(err) {
                // if not, create new user in mongodb
                //console.log('err:', text);
                var user = firebase.auth().currentUser;
                var displayName = user.displayName; 
                var userEmail = user.email; 
                var uid = user.uid; 
                // mongodb
                const url = `/account/create/${displayName}/${userEmail}/${uid}`;
                (async () => {
                    var res  = await fetch(url);
                    var data = await res.json();    
                    console.log(data);        
                })();
              }
          });
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.email;
    });
  }

  return (<>
    <h5>Log in with your email and password</h5>
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
      onClick={handleEmailAndPassword}>Login With Email</button>

    <h5 className="mt-3">OR Login with your Google Account</h5>

    <button 
      className="btn btn-primary mt-3"
      id="googleButton"
      onClick={handleGoogle}>Login With Google</button>

  </>);
}

function LoginMsg(props) {
  return (<>
    <h5>Success! You are now logged-in.</h5>
  </>
  );
}
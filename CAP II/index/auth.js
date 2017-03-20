  (function() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD6ZC7v1hVtN1_gNo5M-MbUoXGv6sZXrJE",
      authDomain: "capstone2017-4504b.firebaseapp.com",
      databaseURL: "https://capstone2017-4504b.firebaseio.com",
      storageBucket: "capstone2017-4504b.appspot.com",
      messagingSenderId: "739463464766"
    };

    firebase.initializeApp(config);

    //get elements
    const txtEmail = document.getElementById('txtEmail');

    const regEmail = document.getElementById('regEmail');

    const regPass = document.getElementById('regPass');

    const txtPassword = document.getElementById('txtPassword');

    const btnLogin = document.getElementById('btnLogin');

    const btnSigUp = document.getElementById('btnSigUp');

    const btnLogout = document.getElementById('btnLogout');

    btnLogin.addEventListener('click', e => {
      //get email
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		auth.signInWithEmailAndPassword(email, pass)
		.then(function(firebaseUser){

			window.location = '../main/repoView.html';

		})
		.catch(function(error) 
		{
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  if (errorCode === 'auth/wrong-password') 
		  {
		    alert('Wrong password.');
		  } 
		  else if(errorCode === 'auth/user-not-found') 
		  {
		    alert('Wrong user.');
		  }
		  else
		  {
		  	console.log(error);
		  }

		});
    });

    btnSigUp.addEventListener('click', e => {
 //get email
      //TODO: CHECK FOR REAL EMAILS
      const email = regEmail.value;
      const pass = regPass.value;
      const auth = firebase.auth();


      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(function(user){
        console.log('uid',user.uid);
        firebase.database().ref('users').child(user.uid).set({
            email: email
        });
        //window.location = '../main/main.html';
        //window.location = '../learning/index.html';
        //Here if you want you can sign in the user
      })
      .catch(function(error) {
          console.log(error);
      });
      //window.location = '../main/main.html';
    });

    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        //window.location = '../main/main.html';
      }
      else
      {
        console.log("not logged in");
      }

    });


}());  
    //   $( "#btnSigUp" ).click(function() {
    //   alert( "Handler for .click() called." );
    // });


    
    

    
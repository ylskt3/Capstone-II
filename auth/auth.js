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

    const txtPassword = document.getElementById('txtPassword');

    const btnLogin = document.getElementById('btnLogin');

    const btnSigUp = document.getElementById('btnSigUp');

    const btnLogout = document.getElementById('btnLogout');

    btnLogin.addEventListener('click', e => {
      //get email
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      const promise = auth.signInWithEmailAndPassword(email, pass)
      //window.location = '../learning/index.html';
      promise.catch(e => console.log(e.message));

      var user = firebase.auth().currentUser;

      if (user) {
        // User is signed in.
        window.location = '../learning/index.html';
      } else {
        // No user is signed in.
      }

    });

    btnSigUp.addEventListener('click', e => {
      //get email
      //TODO: CHECK FOR REAL EMAILS
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();


      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(function(user){
        console.log('uid',user.uid);
        //$userID = user.uid;
        //console.log(userID);
        firebase.database().ref('users').child(user.uid).set({

            birthdate: "1993-06-22",
            email: email,
            firstname: "Jone",
            lastname: "Doe"
          
        });

        //window.location = '../learning/index.html';
        //Here if you want you can sign in the user
      })
      .catch(function(error) {
          console.log(error);
      });

    });

    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //   if(firebaseUser){
    //     console.log(firebaseUser);
    //     //window.location = '../learning/index.html';
    //   }
    //   else
    //   {
    //     console.log("not logged in");
    //   }

    // });

}());  


    
    

    
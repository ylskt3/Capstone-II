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

      auth.signInWithEmailAndPassword(email, pass)
      .then(function(firebaseUser){
        if(firebaseUser)
        {
          window.location = '../repositories/repo.html';
        } 
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
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      var today = new Date();

      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(function(user){
        //print uid
        console.log('uid',user.uid);
        //create a object using uid
        firebase.database().ref().child('users').child(user.uid).set({
            //birthdate: "1993-06-22",
            username:"abcd",
            email: email,
            date_joind: date,
            location: "1234 College Ave, Columbia, Mo, 65201",
            first_name: "Jone",
            last_name: "Doe",
            friends: "null",
            profile_picture_main: "https://s-media-cache-ak0.pinimg.com/564x/79/bf/d8/79bfd8b1793e4f5c910429b0555522ec.jpg",
            profile_picture_thumb: "https://s-media-cache-ak0.pinimg.com/564x/79/bf/d8/79bfd8b1793e4f5c910429b0555522ec.jpg"
        });

      })
      .catch(function(error) {
          console.log(error);
      });

    });

    // btnLogout.addEventListener('click', e => {
    //   firebase.auth().signOut();
    // });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        //window.location = '../learning/index.html';
      }
      else
      {
        console.log("not logged in");
      }

    });

}());  


    
    

    
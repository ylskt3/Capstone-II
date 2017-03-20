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


    firebase.auth().onAuthStateChanged(firebaseUser => {
      
      if(firebaseUser){

      	var dbRefObject = firebase.database().ref('users');
      	var userRepoKeyRef = dbRefObject.child(firebase.auth().currentUser.uid).child('repositories');

        console.log(firebaseUser);
        var btn = document.createElement("BUTTON");
        btn.innerText = "logout";
        document.body.appendChild(btn).id = 'btnLogout';

        const btnLogout = document.getElementById('btnLogout');

	    //	Check to see if there is a user
	    if (firebase.auth().currentUser == null) {
	    	console.log("There is no user signed in");
	    }
	    else {
	    	console.log("There is a user!");
	    }

        btnLogout.addEventListener('click', e => {
        	firebase.auth().signOut();
        	window.location = '../auth/auth.html';
        });

        userRepoKeyRef.on('child_added', userRepoKeySnap => {

		 	console.log(userRepoKeySnap.key);

		 	var repoPhotoRef = firebase.database().ref().child('repositories').child(userRepoKeySnap.key);

		 	var x = document.createElement("TR");
		    x.setAttribute("id", userRepoKeySnap.key);
		    document.getElementById("tbl").appendChild(x);
		    var y = document.createElement("TR");
		    var t = document.createTextNode(userRepoKeySnap.key);
		    y.appendChild(t);
		    document.getElementById(userRepoKeySnap.key).appendChild(y);
		    

		 	repoPhotoRef.on('child_added', repoPhotoKeySnap => {
		 		console.log(repoPhotoKeySnap.key);

		 		var y = document.createElement("TD");
			    var t = document.createTextNode(repoPhotoKeySnap.val());
			    y.appendChild(t);
			    document.getElementById(userRepoKeySnap.key).appendChild(y);


		 		var photosRef = firebase.database().ref().child('photographs').child(repoPhotoKeySnap.key);

		 		photosRef.on('child_added', photosSnap => {
		 			console.log(photosSnap.key);

		 		});
		 	});

        });

	    
	  }
      else
      {
        console.log("not logged in");
        window.location = '../auth/auth.html';
      }

    });

  

}());  


    
    

    
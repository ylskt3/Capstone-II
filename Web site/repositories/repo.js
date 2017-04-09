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
        var btnLogout = document.createElement("BUTTON");
        btnLogout.innerText = "logout";
        document.body.appendChild(btnLogout).id = 'btnLogout';

        var btnSearch = document.createElement("BUTTON");
        btnSearch.innerText = "Search Users";
        document.body.appendChild(btnSearch).id = 'btnSearch';

        var btnAddRepo = document.createElement("BUTTON");
        btnAddRepo.innerText = "Create Repo";
        document.body.appendChild(btnAddRepo).id = 'btnAddRepo';

        var btnBrowseRepo = document.createElement("BUTTON");
        btnBrowseRepo.innerText = "Browse Repo";
        document.body.appendChild(btnBrowseRepo).id = 'btnBrowseRepo';

        const logout = document.getElementById('btnLogout');
        const search = document.getElementById('btnSearch');
        const addRepo = document.getElementById('btnAddRepo');
        const browseRepo = document.getElementById('btnBrowseRepo');

	    //	Check to see if there is a user
	    if (firebase.auth().currentUser == null) {
	    	console.log("There is no user signed in");
	    }
	    else {
	    	console.log("There is a user!");
	    }

        logout.addEventListener('click', e => {
        	firebase.auth().signOut();
        	window.location = '../auth/auth.html';
        });

        search.addEventListener('click', e => {
        	window.location = '../social/social.html';
        });

        addRepo.addEventListener('click', e => {
        	window.location = 'addRepo/addRepo.html';
        });

        browseRepo.addEventListener('click', e => {
        	window.location = 'addRepoFromFriends/friendsRepo.html';
        });


        userRepoKeyRef.on('child_added', userRepoKeySnap => {

    		 	//console.log(userRepoKeySnap.key);

    		 	var repoPhotoRef = firebase.database().ref().child('repositories').child(userRepoKeySnap.key);

    		 	var x = document.createElement("TR");
    	    x.setAttribute("id", userRepoKeySnap.key);
    	    document.getElementById("tbl").appendChild(x);
    	    var y = document.createElement("TR");
    	    //var t = document.createTextNode(userRepoKeySnap.key);
    	    var t = document.createElement('a');
    	    var id = document.getElementById(userRepoKeySnap.key).id;
    		    //console.log(id);
    			t.setAttribute('href',"#");
    			t.innerHTML = userRepoKeySnap.key;
    			t.onclick = function(){
    				 var id = document.getElementById(userRepoKeySnap.key).id;
    				 //alert(id);
    				 sessionStorage.setItem("sent", id); 
    				 window.open("../main/main.html","_blank");
    			};
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


    
    

    
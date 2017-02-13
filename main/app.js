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
        console.log(firebaseUser);
        var btn = document.createElement("BUTTON");
        document.body.appendChild(btn).id = 'btnLogout';

        const btnLogout = document.getElementById('btnLogout');
        const dbRefObject = firebase.database().ref().child('users');
    	const dbRefList = dbRefObject.child(firebase.auth().currentUser.uid);
    	const dbRefImg = dbRefList.child('images');
    	const preObject = document.getElementById('object');
	    const ulList = document.getElementById('list');
	    const imageList = document.getElementById('imageList');
	    var uploader = document.getElementById('uploader');
   		var fileButton = document.getElementById('fileButton');

	    //	Check to see if there is a user
	    if (firebase.auth().currentUser == null) {
	    	console.log("There is no user signed in");
	    }
	    else {
	    	console.log("There is a user!");
	    }

	    dbRefObject.on('value', snap => {
	      preObject.innerText = JSON.stringify(snap.val(), null, 3);
	    });  

	    //Sync
	    dbRefList.on('child_added', snap => {

	      const li = document.createElement('li');

	      li.innerText = snap.val();
	      li.id = snap.key;
	      ulList.appendChild(li);

	    });

	    dbRefImg.on('child_added', snap => {

			// if(snap.key == 'main_url')
			// {
			// 	const img = document.getElementById('img').src = snap.val();
			// }
			const img = document.createElement('img');

			img.src = snap.val();
			img.id = snap.key;

			imageList.appendChild(img);

	    });

	    dbRefList.on('child_changed', snap => {

	      const liChanged = document.getElementById(snap.key);

	      liChanged.innerText = snap.val();

	    });

	    dbRefList.on('child_removed', snap => {

	      const liToRemove = document.getElementById(snap.key);
	      liToRemove.remove();
	      
	    });


        btnLogout.addEventListener('click', e => {
        	firebase.auth().signOut();
        	window.location = '../auth/auth.html';
        });

            //listen for file selection

	    fileButton.addEventListener('change', function(e){

	    //get current date
	      // var today = new Date();

	      // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	      //get file
	      var file = e.target.files[0];

	      //create a storage ref
	      var storageRef = firebase.storage().ref('images').child(firebase.auth().currentUser.uid).child(file.name);
	      //upload file
	      var task = storageRef.put(file);


	      //update progress bar
	      task.on('state_changed', 
	        function progress(snap){
	          var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
	          uploader.value = percentage;
	        },

	        function error(err){

	        },
	        //When the upload is complete, set database
	        function complete(){

				var mainDownloadURL = task.snapshot.metadata.downloadURLs[0];

				console.log( mainDownloadURL );

				firebase.database().ref('users').child(firebase.auth().currentUser.uid).child('images').set({
					main_url: mainDownloadURL
				});
	        }
	      );


	    });
      }
      else
      {
        console.log("not logged in");
        window.location = '../auth/auth.html';
      }

    });

  

}());  


    
    

    
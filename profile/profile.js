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

      //var currentRepo = sessionStorage.getItem("sent");

      if(firebaseUser != null){
        console.log(firebaseUser);
        var btn = document.createElement("BUTTON");
        btn.innerText = "logout";
        document.body.appendChild(btn).id = 'btnLogout';


        const btnLogout = document.getElementById('btnLogout');

        const dbRefUser = firebase.database().ref('users').child(firebase.auth().currentUser.uid);
    	//const dbRefPhoto = firebase.database().ref('photographs');

   		// var fileButton = document.getElementById('fileButton');
   		// var repoKeyRef = dbRefObject.child(firebase.auth().currentUser.uid).child('repositories').child(currentRepo);
   		// var dataURL;
   	

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

        //listen for file selection

        var inputFile = document.getElementById("fileButton");
        var submitBtn = document.getElementById("submit");
        var descriptionTxt = document.getElementById("description");

        fileButton.addEventListener('change', function(e){

        	var file = e.target.files[0];

			var result = '';

            reader = new FileReader();
            reader.onload = (function (tFile) {
                return function (evt) {
                    // var div = document.createElement('div');
                    // div.innerHTML = '<img style="width: 90px;" src="' + evt.target.result + '" />';
                    // //console.log(evt.target.result);
                    // document.getElementById('filesInfo').appendChild(div);

					var canvas = document.getElementById("canvas");
					var ctx = canvas.getContext("2d");

					img = new Image();
					img.onload = function () {

					    canvas.height = canvas.width * (img.height / img.width);

					    /// step 1
					    var oc = document.createElement('canvas'),
					        octx = oc.getContext('2d');

					    oc.width = img.width * 0.5;
					    oc.height = img.height * 0.5;
					    octx.drawImage(img, 0, 0, oc.width, oc.height);

					    /// step 2
					    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

					    ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
					    0, 0, canvas.width, canvas.height);
					}
					img.src = evt.target.result;

					//console.log(canvas[0].toDataURL());
					dataURL = img.src;
					//console.log(img.src);

					// var thumbnailRef = firebase.storage().ref().child('thumbnails').child(firebase.auth().currentUser.uid).child(file.name);

					// thumbnailRef.putString(img.src).then(function(snapshot) {
					// 	console.log('Uploaded a base64 string!');
					// });
                };
            }(file));
            reader.readAsDataURL(file);

        });

	    submitBtn.addEventListener('click', function(){
	    	
	    	const txtFname = document.getElementById('first_name').value;
	        const txtLname = document.getElementById('last_name').value;
	        const txtLocation = document.getElementById('location').value;
	        const txtUsername = document.getElementById('username').value;

	    	//get current date
	      	var today = new Date();

	      	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			var file = inputFile.files[0];

			var storageRef = firebase.storage().ref().child('profile_pics').child(firebase.auth().currentUser.uid).child(file.name);
			//upload file
			var task = storageRef.put(file);

			task.on('state_changed', 
				function progress(snap){
				},

				function error(err){
					
				},
				//When the upload is complete, set database
				function complete(){

					var mainDownloadURL = task.snapshot.metadata.downloadURLs[0];

					console.log( mainDownloadURL );


					dbRefUser.update({
						"username": txtUsername,
			            "date_joined": date,
			            "location": txtLocation,
			            "first_name": txtFname,
			            "last_name": txtLname,
			            "profile_picture_main": mainDownloadURL,
			            "profile_picture_thumb": mainDownloadURL
						
					});
					
				}
			);

			
			
		});



	 	//const dbRefRepo = firebase.database().ref('repositories').child(currentRepo).child('photos');

	    // dbRefRepo.on('value', snap => {
	    // 	// console.log(snap.key);
	    //   	preObject.innerText = JSON.stringify(snap.val(), null, 3);
	    // });  

	  //   dbRefRepo.on('child_added', repoSnap => {

			// dbRefPhoto.child(repoSnap.key).on('child_added', snap => {

			// 	//put the thumbnail.
			// 	if(snap.key == 'thumbnailPath'){

			// 		const img = document.createElement('img');
					

			// 		img.id = repoSnap.key;
			// 		console.log(snap.val());
			// 		firebase.storage().ref().child(snap.val()).getDownloadURL().then(function(thumbnailUrl) {
			// 			console.log(thumbnailUrl);
			// 			img.src = thumbnailUrl;
			// 		});
			// 		img.style = "width:304px;height:228px;"


			// 		imageList.appendChild(img);

			// 	}
			// });

			// //check the thumnail created by cloud function, if database is updated, update the image that user just uploaded.
			// dbRefPhoto.child(repoSnap.key).on('child_changed', snap => {

			// 	firebase.storage().ref().child(snap.val()).getDownloadURL().then(function(thumbnailUrl) {
			// 		document.getElementById(repoSnap.key).src = thumbnailUrl;
			// 	});
				

			// });
	  //   });

	  }
      else
      {
        console.log("not logged in");
        window.location = '../auth/auth.html';
      }

    });

  

}());  

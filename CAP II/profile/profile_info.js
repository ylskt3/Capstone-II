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
        console.log(firebase.auth().currentUser.uid);
        var btn = document.createElement("BUTTON");
        btn.innerText = "logout";
        document.body.appendChild(btn).id = 'btnLogout';


        const btnLogout = document.getElementById('btnLogout');
        const btnEdit = document.getElementById('edit_profile');
        const submitBtn = document.getElementById('update_info');

        const dbRefUser = firebase.database().ref('users').child(firebase.auth().currentUser.uid);


		dbRefUser.on('value', snap =>{
			console.log(snap.val().profile_picture_main);
			document.getElementById("profilePic").src = snap.val().profile_picture_main;
			var full_name = snap.val().first_name + ' ' + snap.val().last_name;
			console.log(full_name);
			document.getElementById("profileName").innerHTML = '<i class="fa fa-user-md fa-fw w3-margin-right w3-large icon-color"></i> ' + full_name;

			if(snap.val().birth_date != null)
				document.getElementById("profileBirthday").innerHTML = '<i class="fa fa-birthday-cake fa-fw w3-margin-right w3-large icon-color"></i> '
				+ snap.val().birth_date;
			else
				document.getElementById("profileBirthday").innerHTML = '<i class="fa fa-birthday-cake fa-fw w3-margin-right w3-large icon-color"></i> '
				+ 'No birthdate info yet';

			document.getElementById("profileEmail").innerHTML = '<i class="fa fa-envelope fa-fw w3-margin-right w3-large icon-color"></i> '
				+ snap.val().email;

			// if(snap.val().phone != null)
			// 	document.getElementById("profileBirthday").innerHTML = '<i class="fa fa-birthday-cake fa-fw w3-margin-right w3-large icon-color"></i> '
			// 	+ snap.val().birth_date;
			// else
			// 	document.getElementById("profileBirthday").innerHTML = '<i class="fa fa-birthday-cake fa-fw w3-margin-right w3-large icon-color"></i> '
			// 	+ 'No birthdate info yet';

			document.getElementById("joinedDate").innerHTML = '<i class="fa fa-calendar fa-fw w3-margin-right w3-large icon-color"></i> Joined: '
				+ snap.val().date_joined;

		});

        btnLogout.addEventListener('click', e => {
        	firebase.auth().signOut();
        	window.location = '../auth/auth.html';
        });

       //  btnEdit.addEventListener('click', e => {
//         	window.location = 'profile.html';
//         });

         submitBtn.addEventListener('click', function(){

	    	if(document.getElementById('first_name').value != ''){
	    		dbRefUser.update({
						"first_name": toTitleCase(document.getElementById('first_name').value)
					}).then(function(){
						alert("updated first name success")
					});
	    	}

	    	if(document.getElementById('last_name').value != ''){
	    		dbRefUser.update({
						"last_name": toTitleCase(document.getElementById('last_name').value)
					}).then(function(){
						alert("updated last name success")
					});
	    	}

	    	if(document.getElementById('form-dateofbirth').value != ''){
	    		dbRefUser.update({
						"birth_date": document.getElementById('form-dateofbirth').value
					}).then(function(){
						alert("updated birthdate success")
					});
	    	}

// 	    	if(document.getElementById('phone_#').value != null){
// 	    		dbRefUser.update({
// 						"phone_number": document.getElementById('birthdate').value
// 					}).then(function(){
// 						alert("updated birthdate success")
// 					});
// 	    	}
	    	// const txtFname = toTitleCase(document.getElementById('first_name').value);
	     //    const txtLname = toTitleCase(document.getElementById('last_name').value);
	     //    const txtLocation = toTitleCase(document.getElementById('location').value);
	     //    const txtUsername = document.getElementById('username').value;

	    	//get current date
	      	var today = new Date();

	      	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			var file = inputFile.files[0];

			if(file != null){
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
				            "date_joined": date,
				            "profile_picture_main": mainDownloadURL,
				            "profile_picture_thumb": mainDownloadURL

						}).then(function(){
						alert("updated profile picture success")
					});

					}
				);
			}


		});

	  }
      else
      {
        console.log("not logged in");
        window.location = '../auth/auth.html';
      }

    });

}());

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

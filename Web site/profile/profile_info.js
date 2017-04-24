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

        btnEdit.addEventListener('click', e => {
        	window.location = 'profile.html';
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

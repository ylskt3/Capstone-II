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
        const btnAdd = document.getElementById('add_this_user');

        var searchedUid = sessionStorage.getItem('uid');

        console.log(searchedUid);

        const dbRefUser = firebase.database().ref('users').child(searchedUid);


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

        btnAdd.addEventListener('click', e => {
        	//window.location = 'profile.html';

          var currUserFriendsRef = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('friends');

          currUserFriendsRef.once('value', function(snapshot) {
            if (snapshot.hasChild(searchedUid)) {
              alert('This user is already in your friend list');
              
            }
            else if(searchedUid == firebase.auth().currentUser.uid){
              alert('Cannot add yourself');
              
            }
            else{
              currUserFriendsRef.child(searchedUid).set('true');
              firebase.database().ref().child('users').child(searchedUid).child('friends').child(firebase.auth().currentUser.uid).set('true');
              var notiRef = firebase.database().ref().child('notifications').child(searchedUid).push();
              var notiKey = notiRef.key;

              //get current time
              var today = new Date();

              var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

              notiRef.set({
                whoAddedYou: firebase.auth().currentUser.uid,
                notification: "has added you as friend",
                notification_time: date,
                notification_id: notiKey
              });

              alert("friend added");
              
            }
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

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

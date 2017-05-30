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
      	console.log('logged in');

      	var userRef = firebase.database().ref('users');
        var notiRef = firebase.database().ref('notifications').child(firebase.auth().currentUser.uid);

        var notiInfo = document.getElementById('notiInfo');

        notiRef.on('child_added', snap => {

			console.log(snap.key);

			var whoAddedMe = snap.child('whoAddedYou').val();
			var notification = snap.child('notification').val();
			var notification_time = snap.child('notification_time').val();

			var div = document.createElement('div');
			div.className = "item show_container";

		    userRef.child(whoAddedMe).once('value', function(userSnap){
		    	//console.log(userSnap.child('first_name').val());
		    	var profileImg = userSnap.child('profile_picture_main').val();
		        console.log(profileImg);
		        var a = document.createElement('a');
				a.className = "ui tiny avatar image";
				var img = document.createElement('img');
				img.src = profileImg;
				
				a.setAttribute('href',"#");
				a.innerHTML = '<img src=' + profileImg +'>';
				div.appendChild(a);

				var divContent = document.createElement('div');
				divContent.className = "content";

		        var first_name = userSnap.child('first_name').val();
		        var last_name = userSnap.child('last_name').val();

		        var aName = document.createElement('a');
		        aName.className = "header";
		        aName.innerHTML = first_name + ' ' + last_name;

		        var divDescription = document.createElement('div');
				divDescription.className = "description";

				var p = document.createElement('p');

				p.innerHTML = notification;

				divDescription.appendChild(p);
				divContent.appendChild(aName);
				divContent.appendChild(divDescription);
			
				var divTime = document.createElement('div');

				var pTime = document.createElement('p');

				pTime.innerHTML = notification_time;

				divTime.appendChild(pTime);
				
				div.appendChild(a);
				div.appendChild(divContent);
				div.appendChild(divTime);
				notiInfo.appendChild(div);

		    });
        });
      }
      else
      {
        console.log("not logged in");
        window.location = '../../auth/auth.html';
      }
    });
  }());
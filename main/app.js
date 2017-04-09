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

      var currentRepo = sessionStorage.getItem("sent");

      if(firebaseUser && currentRepo != null){
        console.log(firebaseUser);
        var btn = document.createElement("BUTTON");
        btn.innerText = "logout";
        document.body.appendChild(btn).id = 'btnLogout';
    	console.log(currentRepo);


        const btnLogout = document.getElementById('btnLogout');
        const dbRefObject = firebase.database().ref('users');
    	const dbRefPhoto = firebase.database().ref('photographs');
    	const preObject = document.getElementById('object');
	    const imageList = document.getElementById('imageList');
	    var uploader = document.getElementById('uploader');
   		var fileButton = document.getElementById('fileButton');
   		var repoKeyRef = dbRefObject.child(firebase.auth().currentUser.uid).child('repositories').child(currentRepo);
   		var dataURL;
   	

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

	    	//get current date
	      	var today = new Date();

	      	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

			var file = inputFile.files[0];

			var newPostRef = firebase.database().ref().child('photographs').push();
			var photoKey = newPostRef.key;
			console.log(photoKey);

			//create a storage ref
			var rand_string = generateRandomFileSafeString(6);
			var extension = pullFileNameExtension(file.name);

			if(extension != "unknown"){
				var newFileName = photoKey + '+' + rand_string + '.' + extension;
				console.log(newFileName);
				var storageRef = firebase.storage().ref('images').child(firebase.auth().currentUser.uid).child(newFileName);
				//upload file
				var task = storageRef.put(file);


				//update progress bar
				task.on('state_changed', 
					function progress(snap){
					  var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
					  uploader.value = percentage;
					},

					function error(err){
						firebase.database().ref().child('photographs').child(photoKey).remvoe();
					},
					//When the upload is complete, set database
					function complete(){

						var mainDownloadURL = task.snapshot.metadata.downloadURLs[0];

						console.log( mainDownloadURL );


						newPostRef.set({
							date_taken: "2001-03-02",
							date_taken_conf: "0.7",
						    uploaderID: firebase.auth().currentUser.uid,
						    date_posted: date,
						    main_url: mainDownloadURL,
						    thumbnailPath: "images/no-picture-yet.jpg",
						    description: descriptionTxt,
						    title: "wow",
						    uid: photoKey
						});

						var currRepoRef = firebase.database().ref().child('repositories').child(currentRepo);
						var repoKey = currRepoRef.key;

						currRepoRef.child('photos').child(photoKey).set("true");
						
						//TODO: create thumbnail

						// var thumbnailFileName = "thumb+" + task.snapshot.metadata.name;
						// console.log(thumbnailFileName);

						
						// setTimeout(function(){
						//     //create thumbnail image ref
						// 	firebase.storage().ref().child('images').child(firebase.auth().currentUser.uid).child(thumbnailFileName).getDownloadURL().then(function(thumbnailUrl) {
						// 		console.log(thumbnailUrl);
						// 	});
						// }, 10000);

					}
				);
			}

			
			
		});



	 	const dbRefRepo = firebase.database().ref('repositories').child(currentRepo).child('photos');

	    // dbRefRepo.on('value', snap => {
	    // 	// console.log(snap.key);
	    //   	preObject.innerText = JSON.stringify(snap.val(), null, 3);
	    // });  

	    dbRefRepo.on('child_added', repoSnap => {

			dbRefPhoto.child(repoSnap.key).on('child_added', snap => {

				//put the thumbnail.
				if(snap.key == 'main_url'){

					var t = document.createElement('a');
	    		    //console.log(id);
	    			t.setAttribute('href',"#");
	    			t.innerHTML = '<img src=' + snap.val() + ' ' +'style = "width:304px;height:228px;"' + '>';
	    			t.onclick = function(){
	    				sessionStorage.setItem("sent", repoSnap.key); 
    				 	window.open("../stories/uploadStories.html","_blank");
	    			};

					// const img = document.createElement('img');
					

					// img.id = repoSnap.key;
					// // console.log(snap.val());
					// // firebase.storage().ref().child(snap.val()).getDownloadURL().then(function(thumbnailUrl) {
					// // 	console.log(thumbnailUrl);
					// // 	img.src = thumbnailUrl;
					// // });
					// img.src = snap.val();
					// img.style = "width:304px;height:228px;";


					imageList.appendChild(t);

				}
			});

			//check the thumnail created by cloud function, if database is updated, update the image that user just uploaded.
			dbRefPhoto.child(repoSnap.key).on('child_changed', snap => {

				firebase.storage().ref().child(snap.val()).getDownloadURL().then(function(thumbnailUrl) {
					document.getElementById(repoSnap.key).src = thumbnailUrl;
				});
				

			});
	    });

	    dbRefPhoto.on('child_removed', snap => {
	    	//when a photo is removed, remove the img on html
	    	console.log(snap.key);
	    	const liToRemove = document.getElementById(snap.key);
	    	console.log(liToRemove);
	    	imageList.removeChild(liToRemove);
	    	//remove the photoUid from repositories
	    	dbRefRepo.child(snap.key).remove();
	    	console.log(repoKeySnap.key);
	    	repoKeyRef.child(repoKeySnap.key).remove();
	    });	

	  }
      else
      {
        console.log("not logged in");
        window.location = '../auth/auth.html';
      }

    });

  

}());  

function generateRandomFileSafeString(str_length) {
	
	var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < str_length; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
    
function pullFileNameExtension( file_name ) {

	var default_value = "unknown";

	var split_strings = file_name.split(".");

	if (split_strings.length != 2){
		//	There was some error
		return default_value;
	}

	return split_strings[1];
}

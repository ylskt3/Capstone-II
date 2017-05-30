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

      var currentPhoto = sessionStorage.getItem("sent");
      console.log(currentPhoto);

      if(firebaseUser != null){

      	var objectUrl;
      	var time = "";
      	var inputFile = document.getElementById("file");
      	var uploader = document.getElementById('uploader');
      	var submitBtn = document.getElementById("submit");

		$("#audio").on("canplaythrough", function(e){
		    var seconds = e.currentTarget.duration;
		    var duration = moment.duration(seconds, "seconds");
		    
		    time = "";
		    var hours = duration.hours();
		    if (hours > 0) { time = hours + ":" ; }
		    
		    time = time + duration.minutes() + ":" + duration.seconds();
		    $("#duration").text(time);
		    
		    URL.revokeObjectURL(objectUrl);
		});

		$("#file").change(function(e){
		    var file = e.currentTarget.files[0];
		   
		    $("#filename").text(file.name);
		    $("#filetype").text(file.type);
		    $("#filesize").text(file.size);
		    
		    objectUrl = URL.createObjectURL(file);
		    $("#audio").prop("src", objectUrl);
		});

		submitBtn.addEventListener('click', function(){
			var title = document.getElementById("title").value;
			var today = new Date();

	      	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	      	var file = inputFile.files[0];

			var newPostRef = firebase.database().ref().child('stories').push();
			var storyKey = newPostRef.key;
			console.log(storyKey);

			var storageRef = firebase.storage().ref('stories').child(firebase.auth().currentUser.uid).child(file.name);
			//upload file
			var task = storageRef.put(file);


			//update progress bar
			task.on('state_changed', 
				function progress(snap){
				  var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				  uploader.value = percentage;
				},

				function error(err){
					firebase.database().ref().child('photographs').child(storyKey).remvoe();
				},
				//When the upload is complete, set database
				function complete(){

					var mainDownloadURL = task.snapshot.metadata.downloadURLs[0];

					console.log( mainDownloadURL );


					newPostRef.set({
						audio_format: file.type,
 						date_uploaded: date,
 						recording_length: time,
 						recording_url: mainDownloadURL,
 						title: title,
 						uid: storyKey,
						uploaded_by: firebase.auth().currentUser.uid
					});

					var currPhotoRef = firebase.database().ref().child('photographs').child(currentPhoto);
					var photoKey = currPhotoRef.key;

					currPhotoRef.child('stories').child(storyKey).set("true");

				}
			);
	
		});
      }
      
  });
}());

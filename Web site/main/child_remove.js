(function() {
// Initialize Firebase
	// var config = {
	//   apiKey: "AIzaSyD6ZC7v1hVtN1_gNo5M-MbUoXGv6sZXrJE",
	//   authDomain: "capstone2017-4504b.firebaseapp.com",
	//   databaseURL: "https://capstone2017-4504b.firebaseio.com",
	//   storageBucket: "capstone2017-4504b.appspot.com",
	//   messagingSenderId: "739463464766"
	// };
	// firebase.initializeApp(config);

	// var currentStory = "--Kh4_D1XwZ5ugzo5XijT"; //sessionStorage.getItem("current_story");
	var currentPhoto = "-KeovzuScQ5HQgbBQU6z";//sessionStorage.getItem("current_photo");
	var currentRepo = "-KfCcj8NM8HD-cxv6C0E";

	const userRef = firebase.database().ref('users'); 
	const photoRef = firebase.database().ref('photographs');
	const storyRef = firebase.database().ref('stories');
	const repoRef = firebase.database().ref('repositories');


	storyRef.on('child_removed', snap => {
		//when a photo is removed, remove the img on html
		console.log(snap.key);

		//if(photoRef.child(currentPhoto).child('stories').hasChild(snap.key)){
		photoRef.child(currentPhoto).child('stories').child(snap.key).remove();
		//}
	});	


	var currentPhotoRef = firebase.database().ref('photographs').child(currentPhoto);

	currentPhotoRef.child('stories').once('value', function(snapshot){
		if(snapshot.val() != null){
			console.log(Object.keys(snapshot.val()));
			console.log(Object.keys(snapshot.val()).length);

			var x;
			for(x = 0; x < (Object.keys(snapshot.val()).length); x++){
				console.log(Object.keys(snapshot.val())[x]);
				storyRef.child(Object.keys(snapshot.val())[x]).remove();
			}
		}

	}).then(function(){
		repoRef.child(currentRepo).child('photos').child(currentPhoto).remove();
		photoRef.child(currentPhoto).remove();
	});

	var currentRepoRef = firebase.database().ref('repositories').child(currentRepo).child('photos');
	currentRepoRef.once('value', function(snapshot){
		if(snapshot.val() != null){
			console.log(snapshot.val());
			console.log(Object.keys(snapshot.val()));
			console.log(Object.keys(snapshot.val()).length);

			var x;
			for(x = 0; x < (Object.keys(snapshot.val()).length); x++){

				console.log(Object.keys(snapshot.val())[x]);

				var currentPhotoRef = firebase.database().ref('photographs').child(Object.keys(snapshot.val())[x]);

				currentPhotoRef.child('stories').once('value', function(snapshot){

					if(snapshot.val() != null){
						console.log(snapshot.val());
						console.log(Object.keys(snapshot.val()));
						console.log(Object.keys(snapshot.val()).length);

						var x;
						for(x = 0; x < (Object.keys(snapshot.val()).length); x++){
							console.log(Object.keys(snapshot.val())[x]);
							storyRef.child(Object.keys(snapshot.val())[x]).remove();
						}
					}
					

				});
				photoRef.child(Object.keys(snapshot.val())[x]).remove();
			}
		}

	}).then(function(){
		repoRef.child(currentRepo).remove();
		userRef.child(firebase.auth().currentUser.uid).child('repositories').child(currentRepo).remove();
	});


}());


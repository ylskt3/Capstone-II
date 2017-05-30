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
	// var currentPhoto = "-Keovx5aHaYmxD6bZrmI";//sessionStorage.getItem("current_photo");

	//const userRef = firebase.database().ref('users'); 
	const photoRef = firebase.database().ref('photographs');
	const storyRef = firebase.database().ref('stories');



	storyRef.on('child_removed', snap => {
		//when a photo is removed, remove the img on html
		console.log(snap.key);

		//if(photoRef.child(currentPhoto).child('stories').hasChild(snap.key)){
		photoRef.child(currentPhoto).child('stories').child(snap.key).remove();
		//}
	});	


}());


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

    //get elements

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');

    //listen for file selection

    fileButton.addEventListener('change', function(e){

      //get file
      var file = e.target.files[0];

      //create a storage ref
      var storageRef = firebase.storage().ref('images/' + file.name);

      ///upload file

      var task = storageRef.put(file);

      //update progress bar
      task.on('state_changed', 
        function progress(snap){
          var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          uploader.value = percentage;
        },

        function error(err){

        },

        function complete(){

        }
      );


    });
}());  
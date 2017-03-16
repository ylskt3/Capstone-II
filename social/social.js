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

      console.log(firebaseUser);

      var userRef = firebase.database().ref('users');
      var btnSearch = document.getElementById('btnSearch');

      btnSearch.addEventListener('click', e => {

        var reqestEmail = document.getElementById('fEmail').value;

        userRef.orderByChild('email')
        .equalTo(reqestEmail)
        .once('value', function(snap){
          var foundUser= snap.val();
          if(foundUser != null){
            console.log(foundUser);
            var searchedUid = Object.keys(foundUser)[0];
            console.log(searchedUid);
            var tmp = JSON.stringify(foundUser, null, "\t"); 
            var lastName = snap.child(searchedUid).child('last_name').val();
            var firstName = snap.child(searchedUid).child('first_name').val();
            //console.log(lastName);
            //document.getElementById('result').value = tmp;

            var profileImg = document.createElement('img');
            profileImg.src = snap.child(searchedUid).child('profile_picture_main').val();
            console.log(profileImg.src);
            //profileImg.style = "width:300px;height:228px;"
            document.getElementById('info').appendChild(profileImg);
            var br = document.createElement('br');
            document.getElementById('info').appendChild(br);

            var name = document.createElement('label').innerText = firstName + " " + lastName;
            document.getElementById('info').append(name);

            var btnAddFridend = document.createElement("BUTTON");
            btnAddFridend.innerText = "Add";
            document.getElementById('info').appendChild(btnAddFridend).id = 'btnAddFridend';
        
            btnAddFridend.addEventListener('click', e => {
              alert("friend added");
            });
          }
          else
          {
            alert("NO USER FOUND");
            
          }


        });
      });
    }
  });
}());

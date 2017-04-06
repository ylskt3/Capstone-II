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

      var currentUserImg;

      userRef.child(firebase.auth().currentUser.uid).child('profile_picture_main').once('value', function(snap){
        currentUserImg = snap.val();
        console.log(currentUserImg);
      });


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
            // var tmp = JSON.stringify(foundUser, null, "\t"); 
            var lastName = snap.child(searchedUid).child('last_name').val();
            var firstName = snap.child(searchedUid).child('first_name').val();
            //console.log(lastName);
            //document.getElementById('result').value = tmp;

            var profileImg = document.createElement('img');
            profileImg.style="width:304px;";
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
              
              var currUserFriendsRef = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('friends');

              currUserFriendsRef.once('value', function(snapshot) {
                if (snapshot.hasChild(searchedUid)) {
                  alert('This user is already in your friend list');
                  location.reload();
                }
                else if(searchedUid == firebase.auth().currentUser.uid){
                	alert('Cannot add yourself');
                	location.reload();
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
                  location.reload();
                }
              });
              
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

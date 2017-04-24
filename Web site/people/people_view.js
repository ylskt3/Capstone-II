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
      const userRef = firebase.database().ref('users');

      var userList = document.getElementById('userList');

      

      userRef.on('child_added', snap =>{
      	
      	var li = document.createElement('li');
      	li.className = "item show_container";

        var lastName = snap.child('last_name').val();
        var firstName = snap.child('first_name').val();

        var ulItems = document.createElement('ul');
        ulItems.className = "ui items";
        ulItems.id = "myUL";

        var a = document.createElement('a');
    		a.className = "ui tiny avatar image";	
    		a.setAttribute('href',"#");
    		a.innerHTML = '<img src=' + snap.child('profile_picture_main').val() +'>';

    		var divNameContent = document.createElement('div');
    		divNameContent.className = "content";

    		var divName = document.createElement('div');
    		divName.className = "description";

    		var name = document.createElement('p');
        name.innerHTML = "<b>Name: </b>" + firstName + ' ' + lastName;

        divName.appendChild(name);
    		divNameContent.appendChild(divName);
    		li.append(a);
    		li.append(divNameContent);


        var divEmailContent = document.createElement('div');
        divEmailContent.className = "content";

        var divEmail = document.createElement('div');
        divEmail.className = "description";

        var email = document.createElement('p');
        email.innerHTML = "<b>Email: </b>" + snap.child('email').val();

        divEmail.appendChild(email);
        divEmailContent.appendChild(divEmail);

        li.append(divEmailContent);

        divAddBtn = document.createElement('div');
        divAddBtn.className = "plus_button_position";

        var btnAddFridend = document.createElement("BUTTON");
        btnAddFridend.className = "plus_button_position";
        btnAddFridend.innerHTML = '<i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>';
        //document.getElementById('info').appendChild(btnAddFridend).id = 'btnAddFridend';
        var searchedUid = snap.key;
        // console.log(searchedUid);

        btnAddFridend.addEventListener('click', e => {

          sessionStorage.setItem('uid', searchedUid);

          window.location = '../profile/profile_others.html';
          
          // var currUserFriendsRef = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('friends');

          // currUserFriendsRef.once('value', function(snapshot) {
          //   if (snapshot.hasChild(searchedUid)) {
          //     alert('This user is already in your friend list');
              
          //   }
          //   else if(searchedUid == firebase.auth().currentUser.uid){
          //     alert('Cannot add yourself');
              
          //   }
          //   else{
          //     currUserFriendsRef.child(searchedUid).set('true');
          //     firebase.database().ref().child('users').child(searchedUid).child('friends').child(firebase.auth().currentUser.uid).set('true');
          //     var notiRef = firebase.database().ref().child('notifications').child(searchedUid).push();
          //     var notiKey = notiRef.key;

          //     //get current time
          //     var today = new Date();

          //     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

          //     notiRef.set({
          //       whoAddedYou: firebase.auth().currentUser.uid,
          //       notification: "has added you as friend",
          //       notification_time: date,
          //       notification_id: notiKey
          //     });

          //     alert("friend added");
              
          //   }
          // });
          
        });
        divAddBtn.append(btnAddFridend);
        li.append(divAddBtn);
    		userList.append(li);

         // <ul class="ui items">
         //          <li class="item show_container">
         //              <a class="ui tiny avatar image">
         //                <img src="../assets/img/backgrounds/CollageThing_light.jpg">
         //              </a>
         //              <div class="content">
         //                <div class="description">
         //                    <p><b>Name:</b> Anthrony Forsythe</p>                   
         //                </div>     
         //              </div>
         //              <div class="content">
         //                <div class="description">
         //                    <p><b>Email:</b> 12345@mail.com</p>     
         //                </div>     
         //              </div>
         //              <div class="plus_button_position">
         //                  <a class="plus_button_position" href="#"><i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i></a>
         //              </div>     
         //          </li>                            
         //  </ul> 

      });

    };
  });
}());

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("userList");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

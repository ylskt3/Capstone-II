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

      userRef.on('child_added', snap =>{

        var lastName = snap.child('last_name').val();
        var firstName = snap.child('first_name').val();

        console.log(lastName);

        var divItems = document.createElement('div');
        divItems.className = "ui items";

         // <div class="ui items">
         //          <div class="item show_container">
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
         //          </div>                            
         //  </div> 

      });

    };
  });
}());
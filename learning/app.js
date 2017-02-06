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

    const preObject = document.getElementById('object');
    const ulList = document.getElementById('list');

    const dbRefObject = firebase.database().ref().child('photographs');
    const dbRefList = dbRefObject.child("fdashfhdjfihiuhfksdjfhksdjf");

    

    dbRefObject.on('value', snap => {
      preObject.innerText = JSON.stringify(snap.val(), null, 3);
    });  

    //Sync
    dbRefList.on('child_added', snap => {

      const li = document.createElement('li');
      if(snap.key == 'main_url')
      {
        const img = document.getElementById('img').src = snap.val();

      }
      li.innerText = snap.val();
      li.id = snap.key;
      ulList.appendChild(li);

    });

    dbRefList.on('child_changed', snap => {

      const liChanged = document.getElementById(snap.key);

      if(snap.key == 'main_url')
      {
        const img = document.getElementById('img').src = snap.val();

      }

      liChanged.innerText = snap.val();

    });

    dbRefList.on('child_removed', snap => {

      const liToRemove = document.getElementById(snap.key);
      liToRemove.remove();
      
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        var btn = document.createElement("BUTTON");
        document.body.appendChild(btn).id = 'btnLogout';

        const btnLogout = document.getElementById('btnLogout');

        btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        window.location = '../auth/auth.html';
        });
      }
      else
      {
        console.log("not logged in");
      }

    });
    
    

}());  


    
    

    
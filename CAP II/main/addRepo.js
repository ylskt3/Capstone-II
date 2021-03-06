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

    //alert("sdffs");

        console.log(firebaseUser);
        var btnSubmit  = document.getElementById('uploadRepoBtn');

        
        btnSubmit.addEventListener('click', e => {
          var getTitle = document.getElementById('title').value;
          var getStart_date = document.getElementById('start_date').value;
           var getEnd_date = document.getElementById('end_date').value;
          // var getShort_des = document.getElementById('short_des').value;
           var getLong_des = document.getElementById('description').value;

          var repoRef = firebase.database().ref().child('repositories').push();
          var repoKey = repoRef.key;
          var userRef = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('repositories').child(repoKey).set('true');

          //get current date
          var today = new Date();

          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

          repoRef.set({
              creation_date: date,
              creator_id: firebase.auth().currentUser.uid,
              end_date: getEnd_date,
              longDescription: getLong_des,
              // shortDescription: getShort_des,
               start_date: getStart_date,
              thumbnailUrl: "https://firebasestorage.googleapis.com/v0/b/photoarchivingtest.appspot.com/o/images%2Fthumbnail%2F501631256.557267_tn.jpg?alt=media&token=58b36368-2afe-4e51-9614-4ca69f371099",
              title: getTitle,
              uid: repoKey
          });
       
      

    });
  }());
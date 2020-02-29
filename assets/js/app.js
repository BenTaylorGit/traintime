var config = {
   
        apiKey: "AIzaSyAofkZwpLbzKA_YCEy0K3KBO3owFuhXCLs",
        authDomain: "traintime-31e75.firebaseapp.com",
        databaseURL: "https://traintime-31e75.firebaseio.com",
        projectId: "traintime-31e75",
        storageBucket: "traintime-31e75.appspot.com",
        messagingSenderId: "251177396006",
        appId: "1:251177396006:web:0ca39caec7e2a13a3f83e7"
     
  };
  
  firebase.initializeApp(config);
  var trainInfo = firebase.database();

  $("#add-btn").on("click", function(event) {

    event.preventDefault();

    var trainName = $("#user-train-name")
      .val()
      .trim();
    var destination = $("#user-destination-name")
      .val()
      .trim();
    var trainTime = $("#user-train-time")
      .val()
      .trim();
    var frequency = $("#user-frequency-time")
      .val()
      .trim();
 console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

  var newTrainObject = {
    name: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency
  };

  trainInfo.ref().push(newTrainObject);
  
  });

  trainInfo.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
  

    var newTrainName = childSnapshot.val().name;
    var newTrainDestination = childSnapshot.val().destination;
    var newTrainFrequency = childSnapshot.val().frequency;
   

    $("#train-sched > tbody").append(
        $("<tr>").append(
          $("<td>").text(newTrainName),
          $("<td>").text(newTrainDestination),
          $("<td>").text(newTrainFrequency),
        )
      );
    });
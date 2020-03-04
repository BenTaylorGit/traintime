// Firebase configuration information
var config = {

    apiKey: "AIzaSyAofkZwpLbzKA_YCEy0K3KBO3owFuhXCLs",
    authDomain: "traintime-31e75.firebaseapp.com",
    databaseURL: "https://traintime-31e75.firebaseio.com",
    projectId: "traintime-31e75",
    storageBucket: "traintime-31e75.appspot.com",
    messagingSenderId: "251177396006",
    appId: "1:251177396006:web:0ca39caec7e2a13a3f83e7"

};

// firebase initialization call
firebase.initializeApp(config);

// set trainInfor equal to the information stored in the firebase database
var trainInfo = firebase.database();

// on click function that adds the information keyed into the form by the user and stores in into a an object.
$("#add-btn").on("click", function (event) {

    event.preventDefault();

    //var to store the user keyed in user information
    var trainName = $("#user-train-name").val().trim();
    var destination = $("#user-destination-name").val().trim();
    var trainTime = $("#user-train-time").val().trim();
    var frequency = $("#user-frequency-time").val().trim();

    // object to save the train information into
    var newTrainObject = {
        name: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    };

    //pushes the information keyed in by user to the database
    trainInfo.ref().push(newTrainObject);

});

// function that adds the info to the firebase database, appends it to the table, and uses Moment.js to figure out train times
trainInfo.ref().on("child_added", function (childSnapshot, prevChildKey) {

    // variables that store each of the objects data
    var newTrainName = childSnapshot.val().name;
    var newTrainDestination = childSnapshot.val().destination;
    var newTrainFrequency = childSnapshot.val().frequency;
    var newTrainTime = childSnapshot.val().trainTime;


    // variables to handle Moment.js
    var timeArr = newTrainTime.split(":"); //splits the times out based on ":"
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]); //assigns the first number in the array as the hour and the second as the minutes
    var maxMoment = moment.max(moment(), trainTime); //figures out the maximum time
    var minutesAway; //stores the number of minutes away a train is
    var arrivalTime; //stores the arrival time

    // logic to figure out if first train time is later than the current time
    if (maxMoment === trainTime) {
        arrivalTime = trainTime.format("hh:mm A");
        minutesAway = trainTime.diff(moment(), "minutes");
    } 
    else {
        var timeDiff = moment().diff(trainTime, "minutes");
        var timeRemainding = timeDiff % newTrainFrequency;
        minutesAway = newTrainFrequency - timeRemainding;
        arrivalTime = moment().add(minutesAway, "m").format("hh:mm A");
    }

    //append the new train information to the table
    $("#train-sched > tbody").append(
        $("<tr>").append(
            $("<td>").text(newTrainName),
            $("<td>").text(newTrainDestination),
            $("<td>").text(newTrainFrequency),
            $("<td>").text(arrivalTime),
            $("<td>").text(minutesAway)
        )
    );
});
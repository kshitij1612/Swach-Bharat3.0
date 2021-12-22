// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPHD1zEF_z-M3cKWCv2KYKe7fAhbSHllk",
    authDomain: "swachbharat-233a9.firebaseapp.com",
    databaseURL: "https://swachbharat-233a9-default-rtdb.firebaseio.com",
    projectId: "swachbharat-233a9",
    storageBucket: "swachbharat-233a9.appspot.com",
    messagingSenderId: "436016424484",
    appId: "1:436016424484:web:1bb44ce26b822ba7c45ab1"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
	
/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
	

const firebaseConfig = {
    apiKey: "AIzaSyBQmbxOlIYZOmE3fp4Mp6-Xwo-HdDlPsHc",
    authDomain: "kwitter-9a6a5.firebaseapp.com",
    databaseURL: "https://kwitter-9a6a5-default-rtdb.firebaseio.com",
    projectId: "kwitter-9a6a5",
    storageBucket: "kwitter-9a6a5.appspot.com",
    messagingSenderId: "128033098146",
    appId: "1:128033098146:web:7df87d7cb821e1100f0afb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set, child, get, update, remove }
from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const realdb = getDatabase();*/


//form 
function signUp() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var saveEP = email.concat("S", password);
    console.log(saveEP);
    firebase.database().ref("/").child(saveEP).update({ purpose: "savingEP" });
    localStorage.setItem("EP", saveEP);
    //spilt id and passoword 
    var poseQ = saveEP.search("S");
    console.log(poseQ);
    var username = saveEP.substring(0, poseQ);
    console.log(username);
    var password = saveEP.substring(poseQ + 1, saveEP.length);
    console.log(password);
    // document.getElementById("login_status").innerHTML = "your id has been created";
}

var emailSignIn = "";
var passwordSignIn = "";


function signIn() {
    console.log("Inside signIn()");
    emailSignIn = document.getElementById("emailNEW").value;
    passwordSignIn = document.getElementById("passwordNEW").value;
    console.log(emailSignIn);
    console.log(passwordSignIn);
    getData();

}

numberOfProfile = 0;

function getData() {
    console.log("Inside getData()");
    firebase.database().ref("/").on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            IDnPass = childKey;
            //Start code
            console.log("IDPASSORD RECIEVED FROM DB - " + IDnPass);
            numberOfProfile++;
            console.log("Profile Count in DB - " + numberOfProfile);

            //spilt id and passoword
            var poseQ = IDnPass.search("S");
            console.log("position of seperator" + poseQ);

            var username = IDnPass.substring(0, poseQ);
            console.log("First Part Before seperator i.e - " + username);
            var password = IDnPass.substring(poseQ + 1, IDnPass.length);
            console.log("Second part after seperator i.e - " + password);
            console.log("Current login - " + emailSignIn + " Current password - " + passwordSignIn);

            console.log("after spilting id nd pass ");

            if ((username.length == emailSignIn.length) && (password.length == passwordSignIn.length)) {
                for (var i = 0; i < username.length; i++) {
                    console.log("Char match" + username.length + i + username[i] + emailSignIn[i]);
                    if ((username[i] != emailSignIn[i]) || (password[i] != passwordSignIn[i])) {
                        console.log("login fail");
                        document.getElementById("login_status").innerHTML = "Try again";
                        break;
                    }
                    if (username.length - 1 == i) {
                        console.log("login success");
                        window.location = "swach.html";
                    }
                }

            }
            else {
                console.log("login fail");
                //document.getElementById("login_status").innerHTML = "Try again";
            }
            //End code
        });
    });
}
// forgot password
/*function forgot_pass() {
    window.location = "forgot_pass.html";

}

function check() {
    forgot_user_id = document.getElementById("forgot_user_id").value;
    console.log("forgot user id - " + forgot_user_id);
}

firebase.database().ref("/").on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        IDnPass = childKey;
        //Start code
        console.log("IDPASSORD RECIEVED FROM DB - " + IDnPass);
        numberOfProfile++;
        console.log("Profile Count in DB - " + numberOfProfile);

        //spilt id and passoword
        var poseQ = IDnPass.search("S");
        console.log("position of seperator" + poseQ);

        var username = IDnPass.substring(0, poseQ);
        console.log("First Part Before seperator i.e - " + username);
        var password = IDnPass.substring(poseQ + 1, IDnPass.length);
        console.log("Second part after seperator i.e - " + password);
        console.log("Current login - " + emailSignIn + " Current password - " + passwordSignIn);


        if (username.length == emailSignIn.length) {
            for (var i = 0; i < username.length; i++) {
                console.log("Char match" + username.length + i + username[i] + emailSignIn[i]);
                if (username[i] != emailSignIn[i]) {
                    console.log("login fail");
                    document.getElementById("login_status").innerHTML = "Try again";
                    break;
                }
                if (username.length - 1 == i) {
                    console.log("login success");
                    window.location = "done.html";
                }
            }

        }
        else {
            console.log("login fail");
            //document.getElementById("login_status").innerHTML = "Try again";
        }
    });
});*/

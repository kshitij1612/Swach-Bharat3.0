var address = "";

// check for Geolocation support
if (navigator.geolocation) { console.log('Geolocation is supported!'); }
else { console.log('Geolocation is not supported for this Browser/OS.'); }

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPos, showErr);
    }
    else {
        alert("Sorry! your Browser does not support Geolocation API")
    }
}
//Showing Current Poistion on Google Map
function showPos(position) {
    latt = position.coords.latitude;
    long = position.coords.longitude;
    console.log("Latt = " + latt);
    console.log("Long = " + long);

    var lattlong = new google.maps.LatLng(latt, long);
    var myOptions = {
        center: lattlong,
        zoom: 15,
        mapTypeControl: true,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    }
    var maps = new google.maps.Map(document.getElementById("demo"), myOptions);
    var markers = new google.maps.Marker({ position: lattlong, map: maps, title: "You are here!" });
}


function showErr(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation API.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("USer location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function submit_address()
{
    address = document.getElementById("address").value;
    console.log(address);

    let str = document.getElementById("address").value; 
    let res = str.replace(/ /g, "+");
    console.log(res);
    
   // document.getElementById("adressCreation").href = "https://earth.google.com/web/search/" + res + "+";
resN = res.concat("+");
finalAdress = "https://earth.google.com/web/search/".concat(resN);
console.log(resN);  
console.log(finalAdress);

    
    document.getElementById("adrs").innerHTML = ' <p class="btn btn-danger">NOTE : If you are using mobile phone then make sure to have google earth app</p>   <br><br>     <h3 id="sound_feature">Click the below button to see garbage around me on google earth</h3>   <br><br> <a id="address" href= "'+ finalAdress+'"/>See Me On Google Earth!</a>'
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
	
	const firebaseConfig = {
	    apiKey: "AIzaSyBQeaOt-ETzmr5UdWIRe29q35_dsi4iE6g",
        authDomain: "upload-image-to-firebase-11e40.firebaseapp.com",
        databaseURL: "https://upload-image-to-firebase-11e40-default-rtdb.firebaseio.com",
        projectId: "upload-image-to-firebase-11e40",
        storageBucket: "upload-image-to-firebase-11e40.appspot.com",
        messagingSenderId: "371956469356",
        appId: "1:371956469356:web:54bc1616e73fbe5f9b1249"
	};
  
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	
    import {getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
	from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";

    import { getDatabase, ref, set, child, get, update, remove }
    from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
	const realdb = getDatabase();
   
   var files = [];
	var reader = new FileReader();

	var namebox = document.getElementById('namebox');
	var extlab = document.getElementById('extlab');
	var myimg = document.getElementById('myimg');
	var proglab = document.getElementById('upprogress');
	var SelBtn = document.getElementById('selbtn');
	var UpBtn = document.getElementById('upbtn');
	var DownBtn = document.getElementById('downbtn');

	var input = document.createElement('input');
	input.type = 'file';

	input.onchange = e =>{
		files = e.target.files;

		var extention = GetExtName(files[0]);
		var name = GetFileName(files[0]);

		namebox.value = name;
		extlab.innerHTML = extention;

		reader.readAsDataURL(files[0]);
	}

	reader.onload = function() {
		myimg.src = reader.result;
	}

	SelBtn.onclick = function(){
		input.click();
	}

	function GetExtName(file) {
		var temp = file.name.split('.');
		var ext = temp.slice((temp.length-1),(temp.length));
		return '.' + ext[0];
	}

	function GetFileName(file) {
		var temp = file.name.split('.');
		var fname = temp.slice(0,-1).join('.');
		return fname;
	}

    async function UploadProcess() {
        var ImgToUpload = files[0];

        var ImgName = namebox.value + extlab.innerHTML;

		if(!ValidateName()){
			alert('name cannot contain ".", "#", "$", "[", "]"')
			return;
		}

        const metaData = {
            contentType: ImgToUpload.type
        }

        const storage = getStorage();

        const storageRef = sRef(storage, "Images/"+ImgName);

        const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);

        UploadTask.on('state-changed', (snapshot)=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            proglab.innerHTML = "Upload"+ progress + "%";
        },
        (error) =>{
            alert("error: image not uploaded!");
        },

        ()=>{
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
                SaveURLtoRealtimDB(downloadURL);
            });
        }
        );
    }

	function SaveURLtoRealtimDB(URL) {
		console.log("SaveURLtoRealtimDB");
		var name = namebox.value;
		var ext = extlab.innerHTML;

		set(ref(realdb,"ImagesLinks/"+name),{
			ImageName: (name+ext),
			ImgUrl: URL
		});
	}

	function GetUrlfromRealtimDB(URL) {
		var name = namebox.value;
		
        var dbRef = ref(realdb);

		get(child(dbRef, "ImagesLinks/"+name)).then((snapshot)=>{
			if(snapshot.exists()){
				myimg.src = snapshot.val().ImgUrl;
			}
		})
	}

	function ValidateName(){
		var regex = /[\.#$\[\]]/
		return !(regex.test(namebox.value));
	}

    UpBtn.onclick = UploadProcess;
	/*DownBtn.onclick = GetUrlfromRealtimDB;*/



/*var textWrapper = document.querySelector('.ml7 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml7 .letter',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml7',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

function logout(){
    window.location = "index.html";
}*/

/*anime.timeline({loop: true})
  .add({
    targets: '.ml15 .word',
    scale: [14,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
    delay: (el, i) => 800 * i
  }).add({
    targets: '.ml15',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });  */

  // Wrap every letter in a span
var textWrapper = document.querySelector('.ml13');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml13 .letter',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 300 + 30 * i
  }).add({
    targets: '.ml13 .letter',
    translateY: [0,-100],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1200,
    delay: (el, i) => 100 + 30 * i
  });   
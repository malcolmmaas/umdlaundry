// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAvIFCKOE2ExtYiQeqn94LfVUyHjpKK_yk",
	authDomain: "umdlaundry.firebaseapp.com",
	databaseURL: "https://umdlaundry-default-rtdb.firebaseio.com",
	projectId: "umdlaundry",
	storageBucket: "umdlaundry.appspot.com",
	messagingSenderId: "599983212187",
	appId: "1:599983212187:web:091be10de0177bcd20e83e",
	measurementId: "G-5Y38YQY8Q6"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// console.log('AAAAAAAAAAA')
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, child, get, set, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db)

var allData = {}

const dbRef = ref(getDatabase());
console.log(dbRef)
// get(ref(db, '/ellicottt')).then((snapshot) => {
get(child(dbRef, '/')).then((snapshot) => {
	if (snapshot.exists()) {
		console.log('HELLO>????')
		// console.log(snapshot.val())
		allData = snapshot.val();
		console.log(allData)
		// for (let key in allData) {
		//     names.push(allData[key]['name']);
		//     uids.push(key)
		// }
		// console.log(allData)
	} else {
		console.log("No data available");
	}
}).catch((error) => {
    console.error(error);
});

console.log(Object.keys(allData))

update(ref(db, '/'), {'name': 'BRUH'});

console.log("COME ON ukNOW")

var paramString = window.location.href;
console.log(paramString.substring(paramString.indexOf('?')))
var searchParams = new URLSearchParams(paramString.substring(paramString.indexOf('?')));
console.log(searchParams.get('dorm'))
var dorm = searchParams.get('dorm')
// alert(dorm)
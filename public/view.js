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

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, child, get, set, update, query, limitToLast, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var selectedMachine = ''
var selectedDorm = ''

const sliderColors = [
    '#32c248',
    '#71c267',
    '#9ac57c',
    '#bbcb75',
    '#ddd06e',
    '#ffd666',
    '#fbc568',
    '#f6b36b',
    '#f0a06d',
    '#eb8e70',
    '#e67c73',
]
sliderColors.reverse()

var paramString = window.location.href
var searchParams = new URLSearchParams(paramString.substring(paramString.indexOf('?')))
var dorm = searchParams.get('dorm')
if (dorm != null) {
    selectedDorm = dorm
    document.getElementById('dorm').value = dorm
}

var modal = document.getElementById("myModal");

var recentData = []
function generateForm() {
    const dormCounts = {
        'ellicott': {
            'washer': 8,
            'dryer': 10
        }
    }

    // var dbRef = ref(db, '/' + selectedDorm + '/' + selectedMachine + '/10')
    // var dbRef = db.ref('/' + selectedDorm + '/' + selectedMachine + '/10')
    
    recentData = []
    var machineCount = dormCounts[selectedDorm][selectedMachine]
    for (const x of Array(machineCount).keys()) {
        var dbRef = query(ref(db, '/' + selectedDorm + '/' + selectedMachine + '/' + (x+1)), limitToLast(5));
        // console.log(dbRef)
        // console.log(x)
        // console.log('/' + selectedDorm + '/' + selectedMachine + '/' + (x+1))
        onValue(dbRef, (snapshot) => {
            // console.log(snapshot.val())
            var reviews = snapshot.val()
            // console.log('[[[[[[[[[[[[[[[[[')
            if (reviews != null) {
                var maxdtms = 0
                var ratingList = []
                for (let [dtms, data] of Object.entries(reviews)) {
                    // console.log(dtms)
                    if (dtms > maxdtms) maxdtms = dtms
                    ratingList.push(parseInt(data['rating']))
                }
                var machineInfo = {'reviews': reviews}
                machineInfo['avgRating'] = ratingList.reduce((a, b) => a + b)/ratingList.length
                machineInfo['maxdtms'] = maxdtms
                machineInfo['number'] = (x+1)

                recentData.push(machineInfo)
                // console.log(machineInfo)
            }
            if (x+1 == machineCount) generateMachineList()
        });
    }
}

function refImg() {
    console.log('THINKG SIEK DML')
    document.getElementById('refImg').src = 'images/'+selectedDorm+' '+selectedMachine+'s.jpg'
    document.getElementById('imgModal').style.display = 'block'
}

function generateMachineList() {
    // console.log('YADDA YADADADA')
    console.log(recentData)
    var machineListContent = ''
    if (sortState == 'time') recentData.sort((a, b) => b['maxdtms'] - a['maxdtms'])
    else if (sortState == 'rating') recentData.sort((a, b) => b['avgRating'] - a['avgRating'])
    else recentData.sort((a, b) => a['number'] - b['number'])
    for (const x of recentData.keys()) {
        var machineData = recentData[x]
        var reviews = machineData['reviews']
        var recentComments = 'Recent comments:'
        var recentRatings = []
        var numComments = 0
        // console.log(reviews)
        // console.log(Object.entries(reviews))
        // console.log(')))))))))))')

        if (reviews != null) {
            for (let [dtms, data] of Object.entries(reviews).reverse()) {
                if (data['comments'] != '' && data['comments'] != undefined && numComments <= 2) {
                    recentComments += '<br><span class="comment">- ' + data['comments'] + '</span>'
                    numComments++
                }
                // console.log(data)
                if (recentRatings.length < 3) recentRatings.push(data['rating'])
            }
            // console.log(recentComments)

            // console.log('====================')
            // console.log(recentRatings)
            if (recentComments == 'Recent comments:') recentComments = ''
            machineListContent += '<div class="machine" id="machine'+machineData['number']+
                '" style="background-color: '+ sliderColors[Math.round(machineData['avgRating'])] +'ee;'+
                '" onclick="unitSelect('+x+')"><span class="machineLabel">#'+machineData['number']+
                '</span><span class="rating">Recent ratings: '+recentRatings.join(', ')+'</span><br><div class="comments">'+
                recentComments+'</div></div>'
        }
    }

    document.getElementById('list').innerHTML = machineListContent
    document.getElementById('restOfForm').style.display = 'block'
}

var sortState = ''

function sortSelect(sort) {
    console.log(sort)
    sortState = sort
    generateMachineList()
}

function unitSelect(unit) {
    console.log(recentData[unit])
    var reviewListContent = ''
    for (let [dtms, data] of Object.entries(recentData[unit]['reviews']).reverse()) {
        // console.log(dtms)
        var dt = new Date(parseInt(dtms))
        // console.log(dt)
        reviewListContent += '<div class="review" style="background-color:'+sliderColors[data['rating']]+
            '"><b><span class="reviewTime">'+dt.toLocaleString()+'</span><span class="rating">'+
            data['rating']+'</span></b><br><span class="comments">'+data['comments']+'</span></div>'
    }

    document.getElementById('reviewlist').innerHTML = reviewListContent
    modal.style.display = 'block'
}

function dormSelect() {
    console.log(document.getElementById('dorm').value)
    if (document.getElementById('dorm').value != 'none') selectedDorm = document.getElementById('dorm').value
    if (selectedMachine != '') generateForm()
}

function machineSelect(machine) {
    selectedMachine = machine
    if (machine == 'dryer') {
        document.getElementById('dryer').style.backgroundColor = '#bfbfbf'
        document.getElementById('washer').style.backgroundColor = '#e5e5e5'
    } else {
        document.getElementById('washer').style.backgroundColor = '#bfbfbf'
        document.getElementById('dryer').style.backgroundColor = '#e5e5e5'
    }
    if (selectedDorm != '') generateForm()
}

document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('imgModal').style.display = 'none'
    modal.style.display = 'none';
}
document.getElementsByClassName('close')[1].onclick = function() {
    document.getElementById('imgModal').style.display = 'none'
    modal.style.display = 'none';
}
// document.getElementById('myModal').onclick = function() {
//     modal.style.display = "none";
// }
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
// window.ontouchstart = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// modal.ontouchstart = function() {
//     modal.style.display = "none";
// }
// document.addEventListener('touchstart', () => modal.style.display = 'none')

window.refImg = refImg
window.sortSelect = sortSelect
window.dormSelect = dormSelect
window.machineSelect = machineSelect
window.unitSelect = unitSelect
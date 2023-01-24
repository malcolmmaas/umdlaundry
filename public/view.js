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

function generateForm() {
    const dormCounts = {
        'ellicott': {
            'washer': 8,
            'dryer': 10
        }
    }

    // var dbRef = ref(db, '/' + selectedDorm + '/' + selectedMachine + '/10')
    // var dbRef = db.ref('/' + selectedDorm + '/' + selectedMachine + '/10')
    
    var recentData = []
    var machineCount = dormCounts[selectedDorm][selectedMachine]
    for (const x of Array(machineCount).keys()) {
        var dbRef = query(ref(db, '/' + selectedDorm + '/' + selectedMachine + '/' + (x+1)), limitToLast(5));
        // console.log(dbRef)
        console.log(x)
        console.log('/' + selectedDorm + '/' + selectedMachine + '/' + (x+1))
        onValue(dbRef, (snapshot) => {
            console.log(snapshot.val())
            recentData.push(snapshot.val())
            if (x+1 == machineCount) generateMachineList()
        });
    }

    function generateMachineList() {
        console.log('YADDA YADADADA')
        var machineListContent = ''
        for (const x of Array(machineCount).keys()) {
            var machineData = recentData[x]
            var recentComments = 'Recent comments:'
            var recentRatings = []
            console.log(machineData)
            console.log(')))))))))))')

            if (machineData != null) {
                for (let [dtms, data] of Object.entries(machineData)) {
                    if (data['comments'] != '') recentComments += '<br><span class="comment">' + data['comments'] + '</span>'
                    if (recentRatings.length < 3) recentRatings.push(data['rating'])
                }
                console.log(recentComments)

                machineListContent += '<div class="machine" id="machine'+(x+1)+'"><span class="machineLabel"></span>#'+(x+1)+
                    '</span><span class="rating">Recent ratings: '+recentRatings.join(', ')+'</span><br><div class="comments">'+
                    recentComments+'</div></div>'
            }
        }

        document.getElementById('list').innerHTML = machineListContent
        document.getElementById('restOfForm').style.display = 'block'
    }

    // document.getElementById('refImg').src = 'images/'+selectedDorm+' '+selectedMachine+'s.jpg'
}

function dormSelect() {
    console.log(document.getElementById('dorm').value)
    if (document.getElementById('dorm').value != 'none') selectedDorm = document.getElementById('dorm').value
    if (selectedMachine != '') generateForm()
}

function machineSelect(machine) {
    selectedMachine = machine
    if (machine == 'dryer') {
        document.getElementById('dryer').style.backgroundColor = '#aaaaaa'
        document.getElementById('washer').style.backgroundColor = '#dddddd'
    } else {
        document.getElementById('washer').style.backgroundColor = '#aaaaaa'
        document.getElementById('dryer').style.backgroundColor = '#dddddd'
    }
    if (selectedDorm != '') generateForm()
}

window.dormSelect = dormSelect
window.machineSelect = machineSelect
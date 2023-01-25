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
import { getDatabase, ref, child, get, set, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

var selectedMachine = ''
var selectedDorm = ''

var paramString = window.location.href
var searchParams = new URLSearchParams(paramString.substring(paramString.indexOf('?')))
var dorm = searchParams.get('dorm')
if (dorm != null) {
    selectedDorm = dorm
    document.getElementById('dorm').value = dorm
}

function generateForm() {
    const dormCounts = {
        'ellicott': {
            'washer': 8,
            'dryer': 10
        }
    }

    var dropdownContent = '<option value="none">-- Select --</option>'
    console.log(selectedDorm)
    console.log(selectedMachine)
    console.log(dormCounts[selectedDorm][selectedMachine])
    for (const x of Array(dormCounts[selectedDorm][selectedMachine]).keys()) {
        dropdownContent += '<option value="'+(x+1)+'">'+(x+1)+'</option>'
    }

    console.log(dropdownContent)

    document.getElementById('unit').innerHTML = dropdownContent
    document.getElementById('restOfForm').style.display = 'block'
    document.getElementById('refImg').src = 'images/'+selectedDorm+' '+selectedMachine+'s.jpg'
    document.getElementById('rating').value = 10
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

function submitReport() {
    const unit = document.getElementById('unit').value
    if (unit == 'none') {
        alert('You must select which number machine you used.')
        return false
    }
    const rating = document.getElementById('rating').value
    const comments = document.getElementById('comments').value

    console.log('boubihujkjk')
    console.log(ref(db, '/' + selectedDorm + '/' + selectedMachine + '/' + unit.toString() + '/' + Date.now().toString()))
    console.log('CCCCCCCCCCCCCccc')
    try {
        update(ref(db, '/' + selectedDorm + '/' + selectedMachine + '/' + unit.toString() + '/' + Date.now().toString()), {
            'rating': rating,
            'comments': comments,
        }).catch((error) => {
            console.log('BBBBBBBBBBBBB')
            console.error(error);
            return false
        });
    } catch(err) {
        console.log('AAAAAAAAAAAAAAAAAAAA')
        console.log(err)
        return false
    }

    document.getElementById('submitConfirmation').style.display = 'inline'
    document.getElementById('submitConfirmation').innerHTML = 'Thanks! Submitted at ' + new Date().toLocaleTimeString() + '.'

    return false
}

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

function updateSlider(element) {
    document.getElementById('sliderLabel').innerHTML = element.value
    document.getElementById('rating').style.background = sliderColors[element.value]
}

window.updateSlider = updateSlider
window.submitReport = submitReport
window.dormSelect = dormSelect
window.machineSelect = machineSelect
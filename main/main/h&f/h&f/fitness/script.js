// script.js

const editIcon = `<i class="fas fa-edit"></i>`;
const deleteIcon = `<i class="fas fa-trash"></i>`;



function addToLocalStorage1() {
    localStorage.setItem('date', JSON.stringify(date));
    localStorage.setItem('steps', JSON.stringify(water));
    localStorage.setItem('calories', JSON.stringify(exercise));
    localStorage.setItem('water', JSON.stringify(bloodsugar));
}
function clearInputs() {
    document.getElementById('steps').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('water').value = '';
}
function activateEdit(i) {
    document.getElementById('steps').value = water[i];
    document.getElementById('calories').value = exercise[i];
    document.getElementById('water').value = bloodsugar[i];
    editIndex = i;
    document.getElementById('submit').classList.add('hidden');
    document.getElementById('editSection').classList.remove('hidden');
}

function cancelEdit() {
    clearInputs();
    editIndex = -1;
    document.getElementById('submit').classList.remove('hidden');
    document.getElementById('editSection').classList.add('hidden');
}

function editRow() {
    if (editIndex === -1) return;
    water[editIndex] = document.getElementById('steps').value;
    exercise[editIndex] = document.getElementById('calories').value;
    bloodsugar[editIndex] = document.getElementById('water').value;
    fillTable();
    addToLocalStorage1();
    cancelEdit();
}

function deleteRow(i) {
    if (!confirm(`Confirm that you want to delete the entry: 
\n ${date[i]}: ${water[i]}ml, ${exercise[i]}min, ${bloodsugar[i]}mg/dL`)) return;
    date.splice(i, 1);
    water.splice(i, 1);
    exercise.splice(i, 1);
    bloodsugar.splice(i, 1);
    document.querySelector(`#output > tr:nth-child(${i + 1})`).classList.add('delete-animation');
    addToLocalStorage1();
    setTimeout(fillTable, 500);
}

function fillTable() {
    const tbody = document.getElementById('output');
    const rows = Math.max(water.length, exercise.length, bloodsugar.length);
    let html = '';
    for (let i = 0; i < rows; i++) {
        let w = water[i] || 'N/A';
        let e = exercise[i] || 'N/A';
        let b = bloodsugar[i] || 'N/A';
        let d = date[i] || 'N/A';
        html += `<tr> 
            <td>${d}</td> 
            <td>${w}</td> 
            <td>${e}</td> 
            <td>${b}</td> 
            <td><button onclick="activateEdit(${i})" class="edit">${editIcon}</button></td> 
            <td><button onclick="deleteRow(${i})" class="delete">${deleteIcon}</button></td> 
        </tr>`;
    }
    tbody.innerHTML = html;
}

let editIndex = -1;
let date = JSON.parse(localStorage.getItem('date')) || [];
let water = JSON.parse(localStorage.getItem('steps')) || [];
let exercise = JSON.parse(localStorage.getItem('calories')) || [];
let bloodsugar = JSON.parse(localStorage.getItem('water')) || [];

document.getElementById('submit').addEventListener('click', () => {
    const w = document.getElementById('steps').value || null;
    const e = document.getElementById('calories').value || null;
    const b = document.getElementById('water').value || null;
    if (w === null || e === null || b === null) {
        alert('Please enter all the fields.');
        return;
    }
    const d = new Date().toLocaleDateString();
    date = [d, ...date];
    water = [w, ...water];
    exercise = [e, ...exercise];
    bloodsugar = [b, ...bloodsugar];
  
    fillTable();
    clearInputs();
    addToLocalStorage1();
});

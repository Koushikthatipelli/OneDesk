// ==========================================
// OneDesk V3 Notes
// Backend Connected
// ==========================================

const API =
"http://localhost:5000/api/notes";

const token =
localStorage.getItem("token");

const headers={

"Content-Type":"application/json",

Authorization:`Bearer ${token}`

};

const editor=
document.getElementById("noteEditor");

const grid=
document.getElementById("notesGrid");

let notes=[];

let editingId=null;

// ===========================
// Load Notes
// ===========================

async function loadNotes(){

try{

const response=

await fetch(

API,

{

headers

}

);

const data=

await response.json();

notes=

data.notes||

data;

renderNotes(notes);

}

catch(error){

console.log(error);

}

}

// ===========================
// New Note
// ===========================

document.getElementById(

"newNoteBtn"

).onclick=()=>{

editingId=null;

editor.style.display="grid";

};

// ===========================
// Save Note
// ===========================

document.getElementById(

"saveNote"

).onclick=

async()=>{

const title=

document.getElementById(

"noteTitle"

).value;

const category=

document.getElementById(

"noteCategory"

).value;

const content=

document.getElementById(

"noteContent"

).value;

if(!title||!content){

alert(

"Please fill all fields."

);

return;

}

const body={

title,

category,

content

};

if(editingId){

await fetch(

API+"/"+editingId,

{

method:"PUT",

headers,

body:JSON.stringify(body)

}

);

editingId=null;

}else{

await fetch(

API,

{

method:"POST",

headers,

body:JSON.stringify(body)

}

);

}

document.getElementById(

"noteTitle"

).value="";

document.getElementById(

"noteContent"

).value="";

editor.style.display="none";

loadNotes();

};
// ===========================
// Render Notes
// ===========================

function renderNotes(list){

grid.innerHTML="";

list.forEach(note=>{

grid.innerHTML+=`

<div class="note-card">

<div class="note-title">

${note.title}

</div>

<div class="note-category">

${note.category}

</div>

<div class="note-content">

${note.content}

</div>

<div class="note-actions">

<button

class="note-btn"

onclick="editNote('${note._id}')">

<i class="ti ti-edit"></i>

Edit

</button>

<button

class="note-btn delete"

onclick="deleteNote('${note._id}')">

<i class="ti ti-trash"></i>

Delete

</button>

</div>

</div>

`;

});

}

// ===========================
// Edit Note
// ===========================

function editNote(id){

const note=

notes.find(

n=>n._id===id

);

if(!note) return;

editingId=id;

document.getElementById(

"noteTitle"

).value=

note.title;

document.getElementById(

"noteCategory"

).value=

note.category;

document.getElementById(

"noteContent"

).value=

note.content;

editor.style.display="grid";

}

// ===========================
// Delete Note
// ===========================

async function deleteNote(id){

if(!confirm(

"Delete this note?"

))

return;

await fetch(

API+"/"+id,

{

method:"DELETE",

headers

}

);

loadNotes();

}
// ===========================
// Search Notes
// ===========================

document.getElementById(

"searchNote"

).addEventListener(

"input",

e=>{

const value=

e.target.value

.toLowerCase();

const filtered=

notes.filter(note=>{

return(

note.title

.toLowerCase()

.includes(value)

||

note.content

.toLowerCase()

.includes(value)

);

});

renderNotes(filtered);

});

// ===========================
// Category Filter
// ===========================

document.getElementById(

"category"

).addEventListener(

"change",

e=>{

const category=

e.target.value;

if(category==="All"){

renderNotes(notes);

return;

}

const filtered=

notes.filter(

note=>

note.category===category

);

renderNotes(filtered);

});

// ===========================
// Cancel
// ===========================

document.getElementById(

"cancelNote"

).onclick=()=>{

editingId=null;

editor.style.display="none";

};

// ===========================
// Close
// ===========================

document.getElementById(

"closeEditor"

).onclick=()=>{

editingId=null;

editor.style.display="none";

};

// ===========================
// Login Check
// ===========================

if(!token){

alert(

"Please login first."

);

window.location.href=

"login.html";

}

// ===========================
// Initialize
// ===========================

window.onload=()=>{

loadNotes();

};

console.log(

"OneDesk V3 Notes Connected"

);
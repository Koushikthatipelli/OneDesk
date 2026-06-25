
const noteInput =
    document.getElementById("noteInput");

const saveNoteBtn =
    document.getElementById("saveNoteBtn");

const notesContainer =
    document.getElementById("notesContainer");

const notesCount =
    document.getElementById("notesCount");

const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

// Daily Quotes

const quotes = [

    "Great ideas start with small notes.",

    "Write it down before you forget it.",

    "Every big project starts as a note.",

    "Capture thoughts. Build dreams.",

    "Your future self will thank you."

];

document.getElementById(
    "noteQuote"
).textContent =

quotes[
    Math.floor(
        Math.random() *
        quotes.length
    )
];

// Load Notes

async function loadNotes() {

    try {

        const response =
                  await fetch(
    `${API_URL}/notes`,
                {
                    headers: {
                        Authorization:
                        `Bearer ${token}`
                    }
                }
            );

        const notes =
            await response.json();

        notesContainer.innerHTML = "";

        notesCount.textContent =
            notes.length;

        if (notes.length === 0) {

            notesContainer.innerHTML = `
                <div class="note-card">
                    <p>
                        ✨ No notes yet.
                        Create your first note.
                    </p>
                </div>
            `;

            return;

        }

        notes.reverse().forEach(note => {

            const card =
                document.createElement("div");

            card.classList.add(
                "note-card"
            );

            const createdDate =
                new Date(
                    note.createdAt
                ).toLocaleString(
                    "en-IN"
                );

            card.innerHTML = `

                <p>
                    ${note.content}
                </p>

                <small
                style="
                color:#9CA3AF;
                display:block;
                margin-bottom:15px;
                ">
                    ${createdDate}
                </small>

                <button
                    class="delete-btn"
                    onclick="
                    deleteNote(
                        '${note._id}'
                    )">
                    Delete
                </button>

            `;

            notesContainer.appendChild(
                card
            );

        });

    }

    catch (error) {

        console.error(error);

    }

}

// Save Note

saveNoteBtn.addEventListener(
"click",
async () => {

    try {

        const content =
            noteInput.value.trim();

        if (!content) {

            alert(
                "Please write a note"
            );

            return;

        }

        await fetch(
           `${API_URL}/notes`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json",

                    Authorization:
                    `Bearer ${token}`
                },

                body: JSON.stringify({
                    content
                })
            }
        );

        noteInput.value = "";

        loadNotes();

    }

    catch (error) {

        console.error(error);

    }

});

// Delete Note

async function deleteNote(id) {

    try {

      await fetch(
    `${API_URL}/notes/${id}`,
    {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
);

loadNotes();

        loadNotes();

    }

    catch (error) {

        console.error(error);

    }

}

loadNotes();


document.addEventListener("DOMContentLoaded", () => {
    const addNote = document.getElementById("add-note");
    const addBtn = document.getElementById("add-btn");
    const notes = document.getElementById("notes");

    const addNotes = () => {
        if (addNote.value === "") {
            alert("please enter a note");
            return;
        }
        const createDiv = document.createElement("div");
        createDiv.classList.add("note-container");
        createDiv.innerHTML = `<p id="note-text">${addNote.value}</p>
                           <div class="buttons"> 
                           <button class="delete-btn">delete</button>
                           <button class="edit-btn">edit</button>
                           </div>`;

        notes.appendChild(createDiv);
        addNote.value = "";
    };

    addBtn.addEventListener("click", addNotes);

   notes.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.parentElement.remove();
    } else if (event.target.classList.contains("edit-btn")) {
        const noteTextElement = event.target.parentElement.previousElementSibling;
        console.log(noteTextElement);
        const newNoteText = prompt("Edit your note", noteTextElement.textContent);
        if (newNoteText !== null) {
            noteTextElement.textContent = newNoteText;
        }
    }
   } );

});
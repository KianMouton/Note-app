document.addEventListener("DOMContentLoaded", () => {
    const addNote = document.getElementById("add-note");
    const addBtn = document.getElementById("add-btn");
    const notes = document.getElementById("notes");
    const clearStorageBtn = document.getElementById("clear-storage");
    
    const addNoteToScreen = (NoteText) => {
        const createDiv = document.createElement("div");
        createDiv.classList.add("note-container");
        createDiv.innerHTML = `<p id="note-text">${NoteText}</p>
                           <div class="buttons"> 
                           <button class="delete-btn">delete</button>
                           <button class="edit-btn">edit</button>
                           </div>`;

        notes.appendChild(createDiv);
        addNote.value = "";
        addNote.focus();
    }

    const fetchCachedNotes = () => {
        for (let i = 0; i < localStorage.length; i++) {
            const cachedNote = localStorage.getItem(`${i}`);
            addNoteToScreen([cachedNote]);
        }
    }

    fetchCachedNotes();

    const addNotes = () => {
        if (addNote.value === "") {
            alert("please enter a note");
            return;
        }
        addNoteToScreen(addNote.value);

        const divs = document.getElementsByClassName("note-container");
        for (let i = 0; i < divs.length; i++) {
            const test = divs[i].firstChild.textContent;
            localStorage.setItem(`${[i]}`, test);
        }
        console.log(localStorage);
    };
    
    addBtn.addEventListener("click", addNotes);
    addNote.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addNotes();
        }
    });

   notes.addEventListener("click", (event) => {
    event.preventDefault();
    if (event.target.classList.contains("delete-btn")) {
        const deletedNote = event.target.parentElement.parentElement;
        const deletedNoteText = deletedNote.firstChild.textContent;
        for (let i = 0; i < localStorage.length;i++) {
            let key = localStorage.key[i];
            let storedValue = localStorage.getItem(key);
            if (storedValue === key) {
                localStorage.removeItem(key);
            }
        }
        
        deletedNote.remove();
        
    } else if (event.target.classList.contains("edit-btn")) {
        const noteTextElement = event.target.parentElement.previousElementSibling;
        console.log(noteTextElement);
        const newNoteText = prompt("Edit your note", noteTextElement.textContent);
        if (newNoteText !== null) {
            noteTextElement.textContent = newNoteText;
        }
    }
   });

   clearStorageBtn.addEventListener("click", () => {
    localStorage.clear();
    // using querySelectorAll here because it updates every time
    // that a new note is added
    const notes = document.querySelectorAll(".note-container");
    for (let i = 0; i < notes.length; i++) {
        notes[i].remove();
    };
   });
});
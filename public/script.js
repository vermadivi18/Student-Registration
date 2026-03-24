async function addStudent() {
    const name = document.getElementById("name").value;
    const roll = parseInt(document.getElementById("roll").value);

    if (!name || isNaN(roll)) {
        alert("Please fill all fields correctly");
        return;
    }

    await fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, roll })
    });

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";

    loadStudents();
}

async function loadStudents() {
    const res = await fetch("/students");
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.name} - ${s.roll}`;
        list.appendChild(li);
    });
}

loadStudents();
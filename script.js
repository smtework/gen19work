function addTask() {
  let pass = prompt("ใส่รหัสก่อนเพิ่มงาน");
  if (pass !== "212224") {
    alert("รหัสผิด");
    return;
  }

  const title = document.getElementById("title").value;
  const due = document.getElementById("due").value;

  if (!title) return alert("กรอกชื่องานก่อน");

  db.collection("tasks").add({
    title: title,
    due: due
  });

  document.getElementById("title").value = "";
  document.getElementById("due").value = "";
}

function loadTasks() {
  db.collection("tasks").onSnapshot(snapshot => {
    let tasks = [];

    snapshot.forEach(doc => {
      tasks.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // ⭐ เรียงจากวันใกล้สุด → ไกลสุด
    tasks.sort((a, b) => new Date(a.due) - new Date(b.due));

    let html = "";

    tasks.forEach(t => {
      html += `
        <div class="task">
          <b>${t.title}</b><br>
          📅 ${t.due}
          <br>
          <button onclick="deleteTask('${t.id}')">ลบ</button>
        </div>
      `;
    });

    document.getElementById("taskList").innerHTML = html;
  });
}

function deleteTask(id) {
  let pass = prompt("ใส่รหัสก่อนลบ");
  if (pass !== "212224") {
    alert("รหัสผิด");
    return;
  }

  db.collection("tasks").doc(id).delete();
}

loadTasks();

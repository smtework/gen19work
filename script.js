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

function addTask() {
  let pass = prompt("ใส่รหัสก่อนเพิ่มงาน");
  if (pass !== "212224") {
    alert("รหัสผิด");
    return;
  }

  const title = document.getElementById("title").value;
  const due = document.getElementById("due").value;
  const detail = prompt("ใส่รายละเอียดเพิ่มเติม (ถ้ามี):") || "";

  if (!title) return alert("กรอกชื่องานก่อน");

  db.collection("tasks").add({
    title: title,
    due: due,
    detail: detail
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

    tasks.sort((a, b) => new Date(a.due) - new Date(b.due));

    let html = "";

    tasks.forEach(t => {
      html += `
        <div class="task">
        <b>${t.title}</b><br>
        📅 ${t.due}
        <br>

        <button onclick="showDetail('${t.id}','${t.detail || ""}')">
          เพิ่มเติม
        </button>

        <button class="edit-btn"
          onclick="editTask('${t.id}','${t.title}','${t.due}')">
          แก้ไข
        </button>

        <button class="delete-btn"
          onclick="deleteTask('${t.id}')">
          ลบ
        </button>
        </div>
      `;
  });


    document.getElementById("taskList").innerHTML = html;
  });
}

function editTask(id, oldTitle, oldDue) {
  let pass = prompt("ใส่รหัสก่อนแก้ไข");
  if (pass !== "212224") {
    alert("รหัสผิด");
    return;
  }

  let newTitle = prompt("แก้ชื่องาน:", oldTitle);
  if (!newTitle) return;

  let newDue = prompt("แก้วันที่ (รูปแบบ YYYY-MM-DD):", oldDue);
  if (!newDue) return;

  db.collection("tasks").doc(id).update({
    title: newTitle,
    due: newDue
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

function showDetail(id, detail) {
  let newDetail = prompt(
    "รายละเอียดงาน:\n\n" + (detail || "ไม่มีรายละเอียด") +
    "\n\nกด OK เพื่อแก้ไข",
    detail
  );

  if (newDetail === null) return;

  let pass = prompt("ใส่รหัสก่อนแก้ไขรายละเอียด");
  if (pass !== "212224") {
    alert("รหัสผิด");
    return;
  }

  db.collection("tasks").doc(id).update({
    detail: newDetail
  });
}

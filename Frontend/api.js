const backendLocation = "../../Backend";

window.onload = loadAll();

function loadAll() {
  $.ajax({
    url: `${backendLocation}/getAllData.php`,
    success: result => {
      document.querySelector(".items").innerHTML = "";
      JSON.parse(result).map(el => {
        createCard(el);
      });
    }
  });
}

function loadLast() {
  $.ajax({
    url: `${backendLocation}/getLastData.php`,
    success: result => {
      createCard(JSON.parse(result)[0]);
    }
  });
}

function addFile() {
  let file = document.querySelector("#file").files[0];
  var formData = new FormData();
  formData.append("file", file);

  $.ajax({
    type: "post",
    url: `${backendLocation}/uploadFile.php`,
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    success: results => {
      loadLast();
    }
  });
}

function remove(item) {
  let formData = "id=" + item.id.slice(4);

  $.ajax({
    type: "post",
    url: `${backendLocation}/delData.php`,
    data: formData,
    success: results => {
      item.parentElement.removeChild(item);
    }
  });
}

function createCard(el) {
  let item = document.createElement("div");
  item.id = `item${el.id}`;
  item.className = "item";

  let name = document.createElement("div");
  name.className = "name";
  name.innerHTML = `${el.name}`;
  item.appendChild(name);

  let type = document.createElement("div");
  type.className = "type";
  type.innerHTML = `${el.type}`;
  item.appendChild(type);

  let parent = document.createElement("div");
  parent.className = "parent";

  parent.innerHTML = `${el.parent ? el.parent : "root"}`;
  item.appendChild(parent);

  let date = document.createElement("div");
  date.className = "date";
  date.innerHTML = `${el.date}`;
  item.appendChild(date);

  let button = document.createElement("button");
  button.className = "removeButton";
  button.innerHTML = "-";
  button.onclick = () => {
    remove(item);
  };
  item.appendChild(button);

  document.querySelector(".items").appendChild(item);
}

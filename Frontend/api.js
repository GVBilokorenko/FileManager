const backendLocation = "../../Backend";

window.onload = loadAll("firstLoad");

function loadAll(path) {
  path = getPath(path);
  let formData = "path=" + path;

  $.ajax({
    type: "post",
    url: `${backendLocation}/getAllData.php`,
    data: formData,
    success: result => {
      document.querySelector(".items").innerHTML = "";
      if (result === "") {
        document.querySelector(".items").innerHTML = "Empty";
      } else {
        JSON.parse(result).map(el => {
          createCard(el);
        });
      }
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
  let formData = new FormData();
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

function addFolder() {
  let name = document.querySelector("#name").value;
  let formData = { path: getPath(path), name: name };

  $.ajax({
    type: "post",
    url: `${backendLocation}/addFolder.php`,
    data: formData,
    success: results => {
      loadAll();
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
  name.className = el.type == "Folder" ? "name folder" : "name file";
  name.innerHTML = `${el.name}`;
  name.onclick = () => {
    setPath(el.id);
  };
  item.appendChild(name);

  let type = document.createElement("div");
  type.className = "type";
  type.innerHTML = `${el.type}`;
  item.appendChild(type);

  let parent = document.createElement("div");
  parent.className = "parent";

  parent.innerHTML = `${el.parent == -1 ? "root" : el.parent}`;
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

function getPath(path) {
  if (path !== "firstLoad") {
    path = document.querySelector("#path").innerHTML.split("/");
    path = path[path.length - 2];
  } else {
    path = "root";
  }
  return path;
}

function setPath(path) {
  document.querySelector("#path").innerHTML += `${path}/`;
  loadAll();
}

function pathBack(path = document.querySelector("#path").innerHTML) {
  if (document.querySelector("#path").innerHTML !== "./root/") {
    path = document.querySelector("#path").innerHTML.split("/");
    path.pop();
    path.pop();
    path = path.join("/") + "/";
    document.querySelector("#path").innerHTML = path;
    loadAll();
  }
}

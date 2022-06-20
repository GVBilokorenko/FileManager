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

function addFile() {
  let file = document.querySelector("#file").files[0];
  let formData = new FormData();
  formData.append("file", file);
  formData.append("path", getPath(path));

  $.ajax({
    type: "post",
    url: `${backendLocation}/uploadFile.php`,
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    dataType: "script",
    success: results => {
      loadAll();
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

function createCard(el) {
  let item = document.createElement("div");
  item.id = `item${el.id}`;
  item.className = "item";

  let name = document.createElement("input");
  name.className = el.type == "Folder" ? "name folder" : "name file";
  name.placeholder = `${el.name}`;
  name.ondblclick = () => {
    setPath(el);
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

  let editButton = document.createElement("button");
  editButton.className = "removeButton";
  editButton.innerHTML = "e";
  editButton.onclick = () => {
    rename(item, name.value);
  };
  item.appendChild(editButton);

  let remButton = document.createElement("button");
  remButton.className = "removeButton";
  remButton.innerHTML = "-";
  remButton.onclick = () => {
    remove(item);
  };
  item.appendChild(remButton);

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

function setPath(item) {
  if (item.type == "Folder") {
    document.querySelector("#path").innerHTML += `${item.id}/`;
    document.querySelector("#showPath").innerHTML += `${item.name}/`;
    loadAll();
  }
}

function pathBack(path = document.querySelector("#path").innerHTML) {
  if (document.querySelector("#path").innerHTML !== "./root/") {
    path = document.querySelector("#path").innerHTML.split("/");
    path.pop();
    path.pop();
    path = path.join("/") + "/";
    document.querySelector("#path").innerHTML = path;
    document.querySelector("#showPath").innerHTML = path;
    loadAll();
  }
}

function scanFolder(id, type, delArr = []) {
  delArr.push(id);
  if (type == "Folder") {
    let formData = "path=" + id;

    $.ajax({
      type: "post",
      url: `${backendLocation}/getAllData.php`,
      data: formData,
      success: result => {
        if (result !== "") {
          JSON.parse(result).map(el => {
            delArr = scanFolder(el.id, el.type, delArr);
          });
        }
      }
    });
  }
  return delArr;
}

function remove(item) {
  let id = item.id.slice(4);
  let type = item.childNodes[1].innerHTML;
  let ids = scanFolder(id, type);
  setTimeout(() => {
    let formData = { ids: ids };

    $.ajax({
      type: "post",
      url: `${backendLocation}/delData.php`,
      data: formData,
      success: results => {
        item.parentElement.removeChild(item);
      }
    });
  }, 1000);
}

function rename(item, value) {
  let id = item.id.slice(4);
  let formData = { id: id, name: value };

  $.ajax({
    type: "post",
    url: `${backendLocation}/renameData.php`,
    data: formData,
    success: results => {
      loadAll();
    }
  });
}

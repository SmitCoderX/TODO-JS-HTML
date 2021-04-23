add = document.getElementById("add");

updateAndDeleteItems = () => {
    title = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([title, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([title, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));

    }
    updateItems();
}

updateItems = () => {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // Populate The Table
    tableBody = document.getElementById("table-body");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleteItem(${index})">Delete</button></td>
      </tr>`;
    });
    tableBody.innerHTML = str;
}


function deleteItem(index) {
    // console.log("deleting items")
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    itemJsonArray.splice(index, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    updateItems();
}


function clearList() {
    if(confirm("Do you really want to clear the whole list?")){
    localStorage.clear();
    updateItems();
    }
}

add.addEventListener("click", updateAndDeleteItems);
updateItems();
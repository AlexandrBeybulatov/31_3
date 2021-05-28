
//create table

$(document).ready(function () {
    createTable();
});

async function createTable() {
    fetch("http://localhost:8080/rest").then(
        res => {
            res.json().then(
                data => {
                    let temp = "";

                    temp += `<tbody id="data">`
                    data.forEach((u) => {

                        temp += `<tr id='lineId${u.id}'>`;
                        temp += `<td id='id${u.id}'>` + u.id + "</td>";
                        temp += `<td id='name${u.id}'>` + u.name + "</td>";
                        temp += `<td id='lastName${u.id}'>` + u.lastName + "</td>";
                        temp += `<td style='display:none' id='password${u.id}'>` + u.password + "</td>";
                        temp += `<td id='roles${u.id}'>` + u.roles + "</td>";
                        temp += `<td>` + `<button type='button' id='editButton'  class='btn btn-primary' onclick='updateFormWriter(${u.id})'>Edit</button>` + "</td>";
                        temp += `<td>` + `<button type='button' id='deleteButton' class='btn btn-danger' onclick='deleteFormWriter(${u.id})'>Delete</button>` + "</td></tr>";

                    })
                    temp += `</tbody>`
                    document.getElementById("table").innerHTML = temp;

                })
        })
}

//Add methods
function readAddForm() {
    let addForm = {};
    addForm['name'] = document.getElementById('addName').value;
    addForm['lastName'] = document.getElementById('addLastName').value;
    addForm['password'] = document.getElementById('addPassword').value;
    let addRoles = [];
    $("input.test[type=checkbox]:checked").each(function () {
        addRoles.push($(this).val());
        addForm['roles'] = addRoles
    });
    return addForm;
}

async function addUser() {
    fetch('http://localhost:8080/rest/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(readAddForm()),
    }).then(function (response) {
        addNewRow();
    })

}

function addNewRow() {
    fetch("http://localhost:8080/rest/add").then(
        res => {
            res.json().then(
                data => {
                    $('#table > tbody:last-child').append(
                        `<tr id="lineId${data.id}">` +
                        `<td id='id${data.id}'>` + data.id + '</td>' +
                        `<td id='name${data.id}'>` + data.name + '</td>' +
                        `<td id='lastName${data.id}'>` + data.lastName + '</td>' +
                        `<td style='display:none' id='password${data.id}'>` + data.password + '</td>' +
                        `<td id='roles${data.id}'>` + data.roles + '</td>' +
                        `<td>` + `<button type='button' id='editButton'  class='btn btn-primary' onclick='updateFormWriter(${data.id})'>Edit</button></td>` +
                        `<td>` + `<button type='button' id='deleteButton' class='btn btn-danger' onclick='deleteFormWriter(${data.id})'>Delete</button></td></tr>`
                    );
                })

        })
}

function clearAddForm() {
    $('#addForm')[0].reset();
}


//Edit methods

function updateFormWriter(td) {
    fetch("http://localhost:8080/rest/" + td).then(
        res => {
            res.json().then(
                data => {
                    $('#editId').val(data.id)
                    $('#editName').val(data.name)
                    $('#editLastName').val(data.lastName)
                    $('#editPassword').val(data.password)
                    $('#editModalPage').modal();
                })

        })

}

function readEditForm() {
    let formData = {};
    formData['id'] = document.getElementById('editId').value;
    formData['name'] = document.getElementById('editName').value;
    formData['lastName'] = document.getElementById('editLastName').value;
    formData['password'] = document.getElementById('editPassword').value;
    let roles = [];
    $("input.test[type=checkbox]:checked").each(function () {
        roles.push($(this).val());
        formData['roles'] = roles
    });
    return formData;
}

async function addEditedRow() {
    $(`#id${readEditForm().id}`).text(readEditForm().id)
    $(`#name${readEditForm().id}`).text(readEditForm().name)
    $(`#lastName${readEditForm().id}`).text(readEditForm().lastName)
    $(`#password${readEditForm().id}`).text(readEditForm().password)
    $(`#roles${readEditForm().id}`).text(readEditForm().roles)
}

function putUser() {
    fetch('http://localhost:8080/rest', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(readEditForm()),
    })
        .catch(error => console.error(error))
}

function closeEditModal() {
    $('#editModalPage').modal('hide');
}

//Delete methods

function deleteFormWriter(id) {
    fetch("http://localhost:8080/rest/" + id).then(
        res => {
            res.json().then(
                data => {
                    $('#deleteId').val(data.id)
                    $('#deleteName').val(data.name)
                    $('#deleteLastName').val(data.lastName)
                    $('#deletePassword').val(data.password)
                    $('#deleteModalPage').modal();
                })

        })
}

function readDeleteForm() {
    let formData = {};
    formData['id'] = document.getElementById('deleteId').value;
    formData['name'] = document.getElementById('deleteName').value;
    formData['lastName'] = document.getElementById('deleteLastName').value;
    formData['password'] = document.getElementById('deletePassword').value;
    return formData;
}

function deleteUser() {

    fetch('http://localhost:8080/rest', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(readDeleteForm()),
    })
        .catch(error => console.error(error))
}

function deleteRow() {
    $(`#lineId${readDeleteForm().id}`).remove();
}

function closeDeleteModal() {
    $('#deleteModalPage').modal('hide');
}
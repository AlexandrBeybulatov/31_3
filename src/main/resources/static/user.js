fetch("http://localhost:8080/rest/user").then(
    res => {
        res.json().then(
            data => {
                let temp = "";
                temp += `<tr>`;
                temp += `<td>` + data.id + "</td>";
                temp += `<td>` + data.name + "</td>";
                temp += `<td>` + data.lastName + "</td>";
                temp += `<td>` + data.roles + "</td></tr>";
                document.getElementById("data").innerHTML = temp;

            })
    })
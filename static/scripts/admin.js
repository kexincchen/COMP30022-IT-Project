// Fetch commands from the server when the page loads
window.onload = function() {
    let numberOfCommands = 0;
    console.log("start admin");
    fetch('/admin/all_commands', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        const commandsList = document.getElementById('commandsList');
        data.forEach(command => {
            numberOfCommands += 1;
            let cellContainer = document.createElement('tr');

            let numberList = document.createElement('th');
            numberList.scope = "row";
            numberList.textContent = numberOfCommands;
            
            let listItem = document.createElement('td');
            listItem.className += "robot-cell";
            listItem.textContent = command.name;


            let btnItem = document.createElement('td');
            let jdCell = document.createElement('input');
            jdCell.className += "jd-cell";
            jdCell.value = command.JDCommand;
            btnItem.appendChild(jdCell);

            let deleteItem = document.createElement('td');
            let deleteButton = document.createElement('button');
            deleteButton.className += "jd-delete";
            deleteItem.appendChild(deleteButton);
            deleteButton.addEventListener("click", () => {
                deleteCommandByName(command.name)
            });


            commandsList.appendChild(cellContainer);
            cellContainer.appendChild(numberList);
            cellContainer.appendChild(listItem);
            cellContainer.appendChild(btnItem);
            cellContainer.appendChild(deleteItem);

            cellContainer.addEventListener("mouseenter", (event) => {
                deleteButton.style.visibility = "visible"
            });

            cellContainer.addEventListener("mouseleave", (event) => {
                deleteButton.style.visibility = "hidden";
            });
        });
    })
    .catch(error => {
        console.error('Error fetching commands:', error);
    });
    
};

// document.getElementById('addCommandForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the form from submitting the traditional way
//     console.log("add command");
//     const commandName = document.getElementById('commandName').value;

//     fetch('/admin/add_command', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ name: commandName })
//     })
//     .then(response => response.text())
//     .then(result => {
//         console.log('Command added:', result);
//         // Optionally, you can refresh the list of commands or give some feedback to the user
//     })
//     .catch(error => {
//         console.error('Error adding command:', error);
//     });
// });


function addCommand(commandName) {
    fetch('/admin/add_command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: commandName })
    })
    .then(response => response.text())
    .then(result => {
        console.log('Command added:', result);
        // Optionally, you can refresh the list of commands or give some feedback to the user
    })
    .catch(error => {
        console.error('Error adding command:', error);
    });
}

function deleteCommandByName(commandName) {
    fetch('/admin/delete_command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: commandName })
    })
    .then(response => response.text())
    .then(result => {
        console.log('Command deleted:', result);
        // Optionally, refresh the list of commands or give feedback to the user
    })
    .catch(error => {
        console.error('Error deleting command:', error);
    });

    location.reload();
}


function performSelectedOperation() {
    const commandName = document.getElementById('commandName').value;
    const selectedOperation = document.getElementById('operationSelect').value;

    if (selectedOperation === "add") {
        addCommand(commandName);
    } else if (selectedOperation === "delete") {
        deleteCommandByName(commandName);
    }
}


function submitCommand() {
    const commands = document.getElementsByClassName("robot-cell");
    const jdCommands = document.getElementsByClassName("jd-cell");
    let input = [];
    for (let i = 0; i < commands.length; i++) {
        input.push({name: commands[i].innerHTML, JDCommand: jdCommands[i].value});
    }
    console.log(input);
    fetch('/admin/update_commands', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ commands: input })
    })
    .then(response => response.text())
    .then(result => {
        console.log('Response:', result);
        // Optionally, you can refresh the list of commands or give some feedback to the user
    })
    .catch(error => {
        console.error('Error adding command:', error);
    });
}
function loadMoreUsers() {
    // Go to bottom of the page to load more users
    window.scrollTo(0,document.body.scrollHeight)
}

function addConnectionsButton() {
    // Get all the users
    console.log('Adding connections to users in view...')
    let users = []
    // Get the table first table element in the page
    var table = document.getElementsByTagName('table')[0]
    // Append the users in the table to the users array
    for (var i = 1; i < table.rows.length; i++) {
        users.push({
            profile: table.rows[i].cells[0].getElementsByTagName('img')[0].src,
            name: table.rows[i].cells[1].innerText,
            section: table.rows[i].cells[2].innerText,
            role: table.rows[i].cells[3].innerText,
        });
    }
    // If the actions column is not present, add it
    if (table.rows[0].cells.length < 6) {
        new_table_header = document.createElement('th')
        new_table_header.innerHTML = 'Actions'
        table.rows[0].appendChild(new_table_header)
    }

    // Add the connection button to each user
    for (var i = 0; i < users.length; i++) {
        if (table.rows[i+1].cells.length < 6) {
            var connection_button = document.createElement('button')
            connection_button.innerHTML = 'Connect'
            connection_button.id = i
            connection_button.onclick = function() {
                // Open a new tab to connect with the user
                console.log('Connecting with user...')
                var user_to_search = users[this.id]
                // generate stirng to search for user which is the name but instead of spaces, it has '%20'
                var user_to_search_string = user_to_search.name.split(' ').join('%20')
                var url = 'https://www.linkedin.com/search/results/all/?keywords=' + user_to_search_string + '%20Boulder%20Colorado'
                window.open(url, '_blank')
            }
            // Add the connection button to the user
            console.log(table.rows[i+1].cells.length)
            table.rows[i+1].insertCell(5)
            table.rows[i+1].cells[5].appendChild(connection_button)
        }
    }
}

// Add button after the form with the class 'form-dialog'
setTimeout(function() {


    var form = document.getElementsByClassName('form-dialog')[0]
    var load_more_users = document.createElement('button')
    load_more_users.innerHTML = 'Load more users'
    load_more_users.onclick = loadMoreUsers

    // Add the button that will add the connection button to each user
    add_connection_button = document.createElement('button')
    add_connection_button.innerHTML = 'Add connections'
    add_connection_button.onclick = addConnectionsButton

    // Wrap the buttons in a div
    var button_div = document.createElement('div')
    button_div.appendChild(load_more_users)
    button_div.appendChild(add_connection_button)

    form.parentNode.insertBefore(button_div, form.nextSibling)
}, 2000)
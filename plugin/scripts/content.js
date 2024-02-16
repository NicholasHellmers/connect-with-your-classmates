function loadMoreUsers() {
    // Go to bottom of the page to load more users
    window.scrollTo(0,document.body.scrollHeight)
}

function scanUsersButton() {
    // Get all the users
    console.log('Adding connections to users in view...')
    let users = [] // user array (cache)

    // Get the table first table element in the page
    var table = document.getElementsByTagName('table')[0]
    
    // Append the users in the table to the users array
    for (var i = 1; i < table.rows.length; i++) {
        users.push({
            profile: table.rows[i].cells[0].getElementsByTagName('img')[0].src,
            name: table.rows[i].cells[1].innerText,
            section: table.rows[i].cells[2].innerText,
            role: table.rows[i].cells[3].innerText,
            clicked: false
        });
    }

    // Load users that are in local storage
    // var users_in_storage = JSON.parse(localStorage.getItem('users')) || []
    // var users_to_add = []

    // Check if a user is in the users_in_storage if they are not, add them to the users_to_add
    // for (var i = 0; i < users.length; i++) {
    //     var user = users[i]
    //     var user_in_storage = users_in_storage.find(function(u) {
    //         return u.name == user.name
    //     })
    //     if (!user_in_storage) {
    //         users_to_add.push(user)
    //     }
    // }

    // Add the users to the users_in_storage
    // users_in_storage = users_in_storage.concat(users_to_add)

    // Save the users to local storage
    // localStorage.setItem('users', JSON.stringify(users_in_storage))
    
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
                    
                    // generate stirng to search for user which is the name but instead of spaces, it has '%20'
                    var user_to_search_string = users[this.id].name.split(' ').join('%20')
                    var url = 'https://www.linkedin.com/search/results/all/?keywords=' + user_to_search_string + '%20Boulder%20Colorado'
                    window.open(url, '_blank')
            }

            // Add styles to the buttons (match the linked in connection button style)
            connection_button_style = {
                'margin': 'auto',
                'padding': '6px 16px',
                'border-radius': '15px',
                'background-color': 'white',
                'color': '#0A66C2',
                'border': '1px solid #0A66C2',
            }
            
            for (var key in connection_button_style) {
                connection_button.style[key] = connection_button_style[key]
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
    load_more_users.innerHTML = 'Load More Users'
    load_more_users.onclick = loadMoreUsers

    // Add the button that will add the connection button to each user
    scan_users = document.createElement('button')
    scan_users.innerHTML = 'Scan Users'
    scan_users.onclick = scanUsersButton

    // Add styles to the buttons
    menu_button_style = {
        'margin': '10px',
        'padding': '10px',
        'border-radius': '15px',
        'background-color': 'white',
        'color': '#3d4a57',
        'border': '1px solid #3d4a57',
    }

    for (var key in menu_button_style) {
        load_more_users.style[key] = menu_button_style[key]
        scan_users.style[key] = menu_button_style[key]
    }

    // Wrap the buttons in a div
    var button_div = document.createElement('div')
    button_div.appendChild(load_more_users)
    button_div.appendChild(scan_users)

    form.parentNode.insertBefore(button_div, form.nextSibling)
}, 2000)
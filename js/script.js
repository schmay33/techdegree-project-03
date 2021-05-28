document.getElementById('name').focus();

//Create Event Listener for on change of role
createEventListener(document.getElementById('title'), 'change', (e) => {
    if (e.target.value === 'other') {
        document.getElementById('other-job-role').style.display = 'inherit';
    } else {
        document.getElementById('other-job-role').style.display = 'none';
    }
});

createEventListener(document.getElementById('design'), 'change', (e) => {
    const color = document.getElementById('color');
    if(e.target.value) {
        color.removeAttribute('disabled');
        let hearts = document.querySelectorAll('option[data-theme="heart js"]');
        let puns = document.querySelectorAll('option[data-theme="js puns"]');
        //If the user selects "Theme - JS Puns" then the "Color" menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
        //If the user selects "Theme - I ♥ JS" then the "Color" menu should only display "Tomato," "Steel Blue," and "Dim Grey."
        console.log(e.target.value);
        if (e.target.value === 'heart js') {
            console.log('In Heart Loop');
            for (let pun of puns) {
                pun.setAttribute('disabled', true);
                color.value == pun.value ? color.value = 'Select a design theme above' : color.value = color.value;
            }
            for (let heart of hearts) {
                heart.removeAttribute('disabled');
            }
        } else if (e.target.value === 'js puns') {
            console.log('In Pun Loop');
            for (let heart of hearts) {
                heart.setAttribute('disabled', true);
                color.value == heart.value ? color.value = 'Select a design theme above' : color.value = color.value;
            }
            for (let pun of puns) {
                pun.removeAttribute('disabled');
            }
        }
        
        
    }
});

/**
 * Helper function to create event listeners
 * @param  {element} el
 * @param  {string} type
 * @param  {function} proc
 */
function createEventListener(el, type, proc) {
    el.addEventListener(type, proc);
}


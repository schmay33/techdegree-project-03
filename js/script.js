document.getElementById('name').focus();

//Create Event Listener for on change of role
createEventListener(document.getElementById('title'), 'change', (e) => {
    if (e.target.value === 'other') {
        document.getElementById('other-job-role').style.display = 'inherit';
    } else {
        document.getElementById('other-job-role').style.display = 'none';
    }
});

//Create event listener for t-shirt design and color
createEventListener(document.getElementById('design'), 'change', (e) => {
    const color = document.getElementById('color');
    if (e.target.value) {
        color.removeAttribute('disabled');
        let hearts = document.querySelectorAll('option[data-theme="heart js"]');
        let puns = document.querySelectorAll('option[data-theme="js puns"]');
        //If the user selects "Theme - JS Puns" then the "Color" menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
        //If the user selects "Theme - I ♥ JS" then the "Color" menu should only display "Tomato," "Steel Blue," and "Dim Grey."
        if (e.target.value === 'heart js') {
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

//Create listener for activities validation
createEventListener(document.getElementById('activities'), 'change', (e) => {
    const list = document.querySelectorAll('input[data-cost]');
    const time = e.target.nextElementSibling.nextElementSibling.innerHTML;
    const compare = e.target;

    //adds functionality to not allow same time of activities
    if (time != '$200') {
        for (let i = 0; i < list.length; i++) {
            if (list[i] != compare && list[i].name != 'all') {
                if (list[i].nextElementSibling.nextElementSibling.innerHTML === time && compare.checked === true) {
                    list[i].setAttribute('disabled', true);
                    list[i].parentNode.classList.add('disabled');
                } else {
                    list[i].removeAttribute('disabled');
                    list[i].parentNode.classList.remove('disabled');
                }
            }
        }
    }
    //calc total cost of activities
    let totalCost = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].checked) {
            totalCost += parseInt(list[i].getAttribute('data-cost'));
        }
    }
    document.getElementById('activities-cost').innerHTML = `Total: $${totalCost}`;
});

//Create listener for payment type
createEventListener(document.getElementById('payment'), 'change', (e) => {
    const value = e.target.value;
    const creditCard = document.getElementById('credit-card');
    const paypal = document.getElementById('paypal');
    const bitcoin = document.getElementById('bitcoin');

    function showEl(el) {
        el.style.display = 'inherit';
    }

    function hideEl(el) {
        el.style.display = 'none';
    }
    if (value === 'credit-card') {
        showEl(creditCard);
        hideEl(paypal);
        hideEl(bitcoin);
    } else if (value === 'paypal') {
        showEl(paypal);
        hideEl(creditCard);
        hideEl(bitcoin);
    } else if (value === 'bitcoin') {
        showEl(bitcoin);
        hideEl(creditCard);
        hideEl(paypal);
    }
});

/** 
 * Checks for a valid name
 * @param  {element} el
 */
function checkName(el) {
    let status = el.value.length > 0;
    if (status) {
        el.parentNode.classList.remove('not-valid');
        el.parentNode.classList.add('valid');
        el.nextElementSibling.style.display = 'none';
    } else {
        el.parentNode.classList.add('not-valid');
        el.nextElementSibling.style.display = 'inherit';
    }
    return status;
}

/** Checks for a valid email address */
function checkEmail(el) {
    const value = el.value;
    const regex = /^(\w+)@(\w+)(\.com)$/;
    const status = regex.test(value);
    const invalidChar = /[(),:;<>[\]]/;
    const match = invalidChar.test(value);
    if (status || match) {
        if (match) {
            const message = "Your email cannot contain invalid characters: ( ) , : ; < > [ ] \\";
            el.nextElementSibling.innerHTML = message;
            el.parentNode.classList.add('not-valid');
            el.nextElementSibling.style.display = 'inherit';
        } else {
            el.parentNode.classList.remove('not-valid');
            el.parentNode.classList.add('valid');
            el.nextElementSibling.style.display = 'none';
        }
    } else {
        el.parentNode.classList.add('not-valid');
        el.nextElementSibling.style.display = 'inherit';
    }
    return status;
}

function checkActivities(el) {
    let status = (el.innerHTML.length > 9);
    if (status) {
        el.parentNode.classList.remove('not-valid');
        el.parentNode.classList.add('valid');
        document.getElementById('activities-hint').style.display = 'none';
    } else {
        el.parentNode.classList.add('not-valid');
        document.getElementById('activities-hint').style.display = 'inherit';
    }
    return status;
}

function checkPayment(payment, card, zip, cvv) {
    let count = 0;
    if (payment.value = 'credit-card') {
        const cardReg = /[0-9]{13,16}/;
        const zipReg = /[0-9]{5}/;
        const cvvReg = /[0-9]{3}/;
        if (cardReg.test(card.value)) {
            count++;
            card.parentNode.classList.remove('not-valid');
            card.parentNode.classList.add('valid');
            card.nextElementSibling.style.display = 'none';
        } else {
            card.parentNode.classList.add('not-valid');
            card.nextElementSibling.style.display = 'inherit';
        }
        if (zipReg.test(zip.value)) {
            count++;
            zip.parentNode.classList.remove('not-valid');
            zip.parentNode.classList.add('valid');
            zip.nextElementSibling.style.display = 'none';
        } else {
            zip.parentNode.classList.add('not-valid');
            zip.nextElementSibling.style.display = 'inherit';
        }
        if (cvvReg.test(cvv.value)) {
            count++;
            cvv.parentNode.classList.remove('not-valid');
            cvv.parentNode.classList.add('valid');
            cvv.nextElementSibling.style.display = 'none';
        } else {
            cvv.parentNode.classList.add('not-valid');
            cvv.nextElementSibling.style.display = 'inherit';
        }
    }
    return count === 3 ? true : false;
}

function checkFields(name, email, act, pay) {
    let count = 0
    checkName(name) ? count++ : count;
    checkEmail(email) ? count++ : count;
    checkActivities(act) ? count++ : count;
    checkPayment(pay[0], pay[1], pay[2], pay[3]) ? count++ : count;
    return count;
}

createEventListener(document.getElementsByTagName('form')[0], 'submit', (e) => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const activities = document.getElementById('activities-cost');
    const payment = document.getElementById('payment');
    const card = document.getElementById('cc-num');
    const zip = document.getElementById('zip');
    const cvv = document.getElementById('cvv');
    //console.log(checkFields(name, email, activities, [payment, card, zip, cvv]));
    if (checkFields(name, email, activities, [payment, card, zip, cvv]) != 4) {
        e.preventDefault();
    } else {
        e.preventDefault();
    }
});

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < checkboxes.length; i++) {
    createEventListener(checkboxes[i], 'focus', (e) => {
        if (e.target.type === 'checkbox') {
            e.target.parentNode.classList.add('focus');
        }
    });

    createEventListener(checkboxes[i], 'blur', (e) => {
        if (e.target.type === 'checkbox') {
            e.target.parentNode.classList.remove('focus');
        }
    });
}

createEventListener(document.getElementById('email'), 'keyup', (e) => {
    checkEmail(document.getElementById('email'));
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
// Your Google API Key and the Calendar ID
const CALENDAR_ID = 'aws.neilcapistrano@gmail.com'; // Replace with your Calendar ID

// Calendar
var calendarEl = document.getElementById('calendar');
let calendar = new FullCalendar.Calendar(calendarEl, {
    googleCalendarApiKey: API_KEY,
    events: {
      googleCalendarId: CALENDAR_ID
    },
    eventMouseEnter: function (ev) {
        let tooltipHTML = `
                <p class='event-title'>${ev.event.title}</p>
                <p class='event-date'>${ev.event.start.toLocaleDateString()}</p>
                <span class='event-info'>${ev.event._def.extendedProps.description || 'No details set'}</span>
        `;

        tippy(ev.el, {
            content: tooltipHTML,
            allowHTML: true,
          });
    },
    eventMouseLeave: function (event) {
       
    }
  });
calendar.render();

// Validation function
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const date = document.getElementById('date');
    const time = document.getElementById('time');
    const services = document.getElementById('services');

    // ADDED JS CONTENT FOR VALIDATION

    // Reset all error styles and messages
    clearErrors([name, email, date, time, services]);

    let isValid = true;

    if (!name.value.trim()) {
        showError(name, '*Please enter your name.');
        isValid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
        showError(email, '*Please enter a valid email address.');
        isValid = false;
    }

    if (!date.value.trim()) {
        showError(date, '*Please select a preferred date.');
        isValid = false;
    }

    if (!time.value.trim()) {
        showError(time, '*Please select a preferred time.');
        isValid = false;
    }

    if (!services.value || services.value === '#') {
        showError(services, '*Please select a service.');
        isValid = false;
    }

    return isValid; // Return true only if all validations passed
}


// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show an error message
function showError(input, message) {
    input.classList.add('error');

    // Check if an error message already exists
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains('error-message')) {
        // Create a new error message
        error = document.createElement('span');
        error.classList.add('error-message');
        error.style.color = 'indianred';
        input.parentNode.insertBefore(error, input.nextSibling);
    }

    // Set the error message text
    error.textContent = message;
}

// Helper function to clear all error styles and messages
function clearErrors(fields) {
    fields.forEach(field => {
        field.classList.remove('error');
        const error = field.nextElementSibling;
        if (error && error.classList.contains('error-message')) {
            error.remove();
        }
    });
}

// Real-time validation function
function addRealTimeValidation() {
    const fields = document.querySelectorAll('#name, #email, #date, #time, #services');

    fields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, 'Please enter a valid email address.');
            } else if (field.value.trim() === '' || (field.tagName === 'SELECT' && field.value === '#')) {
                if (field.tagName === 'SELECT') {
                    showError(field, 'Please select a service.');
                } else {
                    showError(field, `Please fill out this field.`);
                }
            } else {
                clearErrors([field]); // Remove the error if the input is valid
            }
        });

        // For dropdown (select), listen to the "change" event
        if (field.tagName === 'SELECT') {
            field.addEventListener('change', () => {
                if (field.value !== '#') {
                    clearErrors([field]); // Remove error if a valid option is selected
                } else {
                    showError(field, 'Please select a service.');
                }
            });
        }
    });
}

addRealTimeValidation();

document.getElementById('calendar-submit').addEventListener('click', () => {
    if (!validateForm()) {
        return; // Exit the function if validation fails
    }
    content.innerText = 'Waiting for user login';
    loadGoogleScripts();
})

// Set Event in Google
async function addEventGoogle(data) {
    
    document.getElementById("calendar-submit").setAttribute('disabled','');
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const services = document.getElementById("services").value;

    const event = {
        'summary': `${name} Appointment`,
        'location': 'Evergreen Southwest, Calgary Alberta, Canada',
        'description': `Appointment set by ${name}, wanted to know more about ${services}`,
        'start': {
          'dateTime': `${date}T${time}:00-07:00`,
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': `${date}T${time}:00-07:00`,
          'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
          'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'attendees': [
          {'email': `${email}`},
          {'email': 'matt@nightsparrowsproduction.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      };
      
      const request = gapi.client.calendar.events.insert({
        'calendarId': 'aws.neilcapistrano@gmail.com',
        'resource': event
      });

      try {
        await request.execute(function(event) {
            calendar.refetchEvents();
            content.innerText = 'You have successfully set an appointment!';
            document.getElementById("name").value = '';
            document.getElementById("email").value = '';
            document.getElementById("date").value = '';
            document.getElementById("time").value = '';
            document.getElementById("services").value = '';

          });

          document.getElementById("calendar-submit").removeAttribute('disabled');
      }catch(err){
        console.log('schedule')
      }
    
}
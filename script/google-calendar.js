/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '586261755616-o2ps8c21hbi1iqgm1uuo7q06ge8vi0pv.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCWLfqXiZ_DCeUDGYbx2HQyy1JzwW83Kps';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

let tokenClient;
let gapiInited = false;
// let gisInited = false;
let elContent = document.getElementById('content');

// document.getElementById('authorize_button').style.visibility = 'hidden';
// document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
async function gisLoaded() {
    tokenClient = await google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        signin();
        //document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

/**
 *  Sign in the user upon button click.
 */
function signin() {
    tokenClient.callback = async (resp) => {
        
        if (resp.error !== undefined) {
            
            throw (resp);
            elContent.innerText = 'You must log in with an approved account to schedule an event in with Night Sparrow Production!';
            elContent.style.color = 'indianred'
        }
        elContent.innerText = '';
        addEventGoogle();
    };
    try {
        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({prompt: ''});
        }
    }catch(err) {
        console.log("Signin")
    }
    
  
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        // document.getElementById('authorize_button').innerText = 'Authorize';
        // document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

function loadGoogleScripts() {
    // Dynamically create and add the first script
    const gapiScript = document.createElement('script');
    gapiScript.src = "https://apis.google.com/js/api.js";
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = gapiLoaded; // Callback when loaded
    document.head.appendChild(gapiScript);

    // Dynamically create and add the second script
    const gisScript = document.createElement('script');
    gisScript.src = "https://accounts.google.com/gsi/client";
    gisScript.defer = true;
    gisScript.onload = gisLoaded; // Callback when loaded
    document.head.appendChild(gisScript);
}
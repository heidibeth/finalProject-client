let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:4000';
        break;
    case 'hbv-seizetd-client.herokuapp':
        APIURL = 'https://hbv-seizetd-client.herokuapp.com/'
}

export default APIURL;
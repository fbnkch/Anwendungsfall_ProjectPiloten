// script.js

let loggedIn = false;

document.addEventListener('DOMContentLoaded', () => {
  const userInfo = document.getElementById('user-info');
  const reserveButtons = document.querySelectorAll('.vehicle button');
  const statusMessage = document.getElementById('status-message');

  // Login/Logout Handling
  userInfo.addEventListener('click', () => {
    if (loggedIn) {
      loggedIn = false;
      userInfo.textContent = 'Login';
      alert('Sie haben sich erfolgreich ausgeloggt.');
    } else {
      const username = prompt('Geben Sie Ihre Active Directory Nummer ein:');
      if (username) {
        loggedIn = true;
        userInfo.textContent = username;
        alert(`Willkommen, ${username}!`);
      }
    }
  });

  // Reservierung Handling
  reserveButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!loggedIn) {
        alert('Bitte melden Sie sich zuerst an, um eine Reservierung vorzunehmen.');
        return;
      }

      const vehicleName = button.closest('.vehicle').dataset.vehicle;
      statusMessage.textContent = `Sie haben ${vehicleName} erfolgreich reserviert!`;
    });
  });
});

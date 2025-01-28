// Fahrzeuge-Daten
let vehicles = [
  { id: 1, name: "E-Roller Emil", count: 10, image: "images/E-scooter_Emil.jpg" },
  { id: 2, name: "Fahrrad Gottfried", count: 14, image: "images/Fahrrad_Gottfried.jpg" },
  { id: 3, name: "E-Fahrrad Ursula", count: 5, image: "images/E-Fahrrad_Ursula.jpg" }
];

// Reservierungsdaten
let reservations = [];

// Aktueller Benutzer
let currentUser = null;

// Funktion: Benutzer einloggen
function loginUser(username) {
  if (!username || username.trim() === "") {
    showFeedback("Bitte geben Sie einen gültigen Namen ein.", "error");
    return;
  }

  let currentUser = username.trim();
  sessionStorage.setItem("currentUser", currentUser);
  showFeedback(`Willkommen, ${currentUser}!`, "success");
  updateUserStatus();
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

// Funktion: Benutzer ausloggen
function logoutUser() {
  if (confirm("Möchten Sie sich abmelden?")) {
    currentUser = null;
    sessionStorage.removeItem("currentUser");
    alert("Sie wurden erfolgreich abgemeldet.");
    updateUserStatus();
    window.location.href = "login.html";
  }
}

// Funktion: Benutzerstatus aktualisieren
function updateUserStatus() {
  const userStatus = document.getElementById("user-status");
  if (currentUser) {
    userStatus.textContent = `Eingeloggt als: ${currentUser}`;
    userStatus.style.cursor = "pointer";
    userStatus.onclick = logoutUser;
  } else {
    userStatus.textContent = "Login";
    userStatus.style.cursor = "pointer";
    userStatus.onclick = () => {
      window.location.href = "index.html";
    };
  }
}

// Funktion: Feedback anzeigen
function showFeedback(message, type) {
  const feedbackElement = document.getElementById("login-feedback");
  if (feedbackElement) {
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${type}`;
  }
}

// Funktion: Fahrzeug reservieren
function reserveVehicle(vehicleId) {
  const vehicle = vehicles.find(vehicle => vehicle.id === parseInt(vehicleId));
  if (vehicle) {
    const reservation = {
      vehicle: vehicle,
      user: currentUser,
      timestamp: new Date().getTime()
    };
    reservations.push(reservation);
    //reservations = [];
    localStorage.setItem("reservations", JSON.stringify(reservations));
    showFeedback(`Fahrzeug ${vehicle.name} erfolgreich reserviert!`, "success");
    window.location.href = "reservations.html";
  } else {
    showFeedback("Fahrzeug nicht gefunden!", "error");
  }
}

// Funktion: Fahrzeug-Liste laden
function loadVehicleList() {
  const vehicleListElement = document.getElementById("vehicle-list");
  if (vehicleListElement) {
    vehicleListElement.innerHTML = "";
    vehicles.forEach(vehicle => {
      const vehicleElement = document.createElement("article");
      vehicleElement.innerHTML = `
        <div class="vehicle-image">
          <img src="${vehicle.image}" alt="${vehicle.name}" class="vehicle-image">
        </div>
        <h3>${vehicle.name}</h3>
        <p>Akkustand: ${vehicle.count}%</p>
        <p>Verfügbare Anzahl: ${vehicle.count}</p>
        <button class="reserve-button" data-vehicle-id="${vehicle.id}">Reservieren</button>
      `;
      vehicleListElement.appendChild(vehicleElement);
    });
  }
}

// Funktion: Reservierungen laden
function loadReservations() {
  const storedReservations = localStorage.getItem("reservations");
  if (storedReservations) {
    reservations = JSON.parse(storedReservations);
  }
}

// Funktion: Aktuelle Reservierungen anzeigen
function showCurrentReservations() {
  const currentReservationsElement = document.getElementById("my-reservations");
  if (currentReservationsElement) {
    currentReservationsElement.innerHTML = "";
    reservations.forEach(reservation => {
      const reservationElement = document.createElement("li");
      reservationElement.className = "reservation-item";
      reservationElement.innerHTML = `
        <strong>${reservation.vehicle.name}</strong> - ${new Date(reservation.timestamp).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${new Date(reservation.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}, Fahrzeugstandort: Neukölln
        <button class="activate-button reserve-button" data-reservation-id="${reservation.id}">Aktivieren</button>`;
      currentReservationsElement.appendChild(reservationElement);
    });
  }
}

// Funktion: Alle Reservierungen anzeigen
function showAllReservations() {
  const allReservationsElement = document.getElementById("all-reservations");
  if (allReservationsElement) {
    allReservationsElement.innerHTML = "";
    reservations.forEach(reservation => {
      const reservationElement = document.createElement("li");
      reservationElement.className = "reservation-item";
      reservationElement.innerHTML = `
        <strong>${reservation.vehicle.name}</strong> - ${new Date(reservation.timestamp).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${new Date(reservation.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}, Fahrzeugstandort:Neukölln, Mitarbeiterkennnummer: ${reservation.user}
      `;
      allReservationsElement.appendChild(reservationElement);
    });
  }
}

// Funktion: Reservierung aktivieren
function activateReservation(reservationId) {
  const reservation = reservations.find(reservation => reservation.id === parseInt(reservationId));
  if (reservation) {
    // Hier kann die Logik für die Aktivierung der Reservierung hinzugefügt werden
    console.log(`Reservierung ${reservationId} aktiviert`);
  } else {
    console.error(`Reservierung ${reservationId} nicht gefunden`);
  }
}



// Event-Listener für Reservier-Button
document.addEventListener("DOMContentLoaded", () => {
  const reserveButtons = document.querySelectorAll(".reserve-button");
  reserveButtons.forEach(button => {
    button.addEventListener("click", event => {
      const vehicleId = event.target.dataset.vehicleId;
      reserveVehicle(vehicleId);
    });
  });
  const activateButtons = document.querySelectorAll(".activate-button");
  activateButtons.forEach(button => {
    button.addEventListener("click", event => {
      const reservationId = event.target.dataset.reservationId;
      activateReservation(reservationId);
    });
  })
  loadVehicleList();
  loadReservations();
  showCurrentReservations();
  showAllReservations();
  showMyReservations();
  updateUserStatus();
  setTimeout(() => {
    window.location.href = "vehicles.html";
  }, 1500);
});
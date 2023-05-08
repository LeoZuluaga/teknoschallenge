let url = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/inbox';
let currentUrl = url;


// FUNCIONES

const loadPage = () => {
    document.addEventListener("DOMContentLoaded", function() {
        const inboxElement = document.getElementById("inbox");
        console.log(inboxElement);
    })
}


const loadData = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => mostrarData(data))
      .catch(error => console.log(error));
  }

loadData(currentUrl);

const mostrarData = (data) => {
    console.log(data)
  let body = "";
  for (let i = 0; i < data.length; i++) {
    body += `<div id="mail-${i}" class="mail-item">
    <div class="checkbox"><input type="checkbox"></div>
    <div class="starred"><i class='bx bx-star'></i></div>
    <div class="mail-sender">${data[i].from.name}</div>
    <div class="mail-subject">${data[i].subject}</div>
    
    <div class="mail-time">${data[i].time}</div>
  </div>`;
  }
  document.getElementById('data').innerHTML = body;

  for (let i = 0; i < data.length; i++) {
    const mail = document.getElementById(`mail-${i}`);
    mail.addEventListener("click", () => verMail(data[i]));
  }
}


const verMail = (correo) => {
    let body = `
      <div class="mail">
        <h1>${correo.subject}</h1>
        <p>De: ${correo.from.name}, ${correo.from.email}</p>
        <p>Para: ${correo.to.email}</p>
        <p>Fecha: ${correo.time}</p>
        <hr>
        <p>${correo.message}</p>
      </div>
    `;
    document.getElementById('data').innerHTML = body;
  }




// BOTONES

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("inbox").addEventListener('click', () => {
      const currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/inbox';
      loadData(currentUrl);
    });
  });

// document.getElementById("inbox").addEventListener('click', () => {
    
//   currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/inbox';
//   loadData(currentUrl);
// });


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("important").addEventListener('click', () => {
      const currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/important';
      loadData(currentUrl);
    });
  });
// document.getElementById("important").addEventListener('click', () => {
//   currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/important';
//   loadData(currentUrl);
// });

// document.getElementById("starred").addEventListener('click', () => {
//   currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/starred';
//   loadData(currentUrl);
// });
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("starred").addEventListener('click', () => {
      const currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/starred';
      loadData(currentUrl);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("sent").addEventListener('click', () => {
      const currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/sent';
      loadData(currentUrl);
    });
  });

// document.getElementById("sent").addEventListener('click', () => {
//   currentUrl = 'https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/sent';
//   loadData(currentUrl);
// });


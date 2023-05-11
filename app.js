let tipoMail = "inbox";
let url =
  "https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/inbox";
let currentUrl = url;

// FUNCIONES

// FUNCION ABRIR EL COMPOSE DE MAIL

function openCompose() {
  let mailpop = document.getElementById("email-popup");
  console.log(mailpop);
  mailpop.style.visibility = "visible";
}
// FUNCION CERRAR EL COMPOSE DE MAIL (X)

function closeCompose() {
  let mailpop = document.getElementById("email-popup");
  console.log(mailpop);
  mailpop.style.visibility = "hidden";
}

// FUNCION VIEJA NO CARGABA EL DOM

// const loadPage = () => {
//     document.addEventListener("DOMContentLoaded", function() {
//         const inboxElement = document.getElementById("inbox");
//         console.log(inboxElement);
//     })
// }

// FUNCION BUSCAR LOS DATOS DE LA API CON METODO GET (DEFAULT DE FETCH) Y EJECUTAR EL MOSTRARDATA

const loadData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => mostrarData(data))
    .catch((error) => console.log(error));
};

loadData(currentUrl);

// FUNCION MUESTRA LOS DATOS DE LA API REST CREANDO UN CODIGO HTML Y REEMPLAZANDO LOS VALORES DINAMICOS CON LAS VARIABLES DE LOS OBJETOS

const mostrarData = (data) => {
  console.log(data);
  let body = "";
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].time);
    body += `<div id="mail-${i}" class="mail-item">
    <div class="mail-sender">${data[i].from.name}</div>
    <div class="mail-subject">${data[i].subject}</div>
    <div class="mail-time">${data[i].time}</div>
  </div>`;
  }

  document.getElementById("data").innerHTML = body;

  for (let i = 0; i < data.length; i++) {
    const mail = document.getElementById(`mail-${i}`);
    mail.addEventListener("click", () => verMail(data[i]));
  }
};

// FUNCION PARA MOSRTRAR CONTENIDO DE LOS MAIL, CONTIENE LA FUNCION PARA BORRAR DICHO MAIL USANDO METODO DELETE

const verMail = (correo) => {
  let body = `
      <div class="mail">
        <h1>${correo.subject}</h1>
        <p>De: ${correo.from.name}, ${correo.from.email}</p>
        <p>Para: ${correo.to.email}</p>
        <p>Fecha: ${correo.time}</p>
        <hr>
        <p>${correo.message}</p>
        <button class="eliminar-mail" id="${correo.id}">Eliminar</button>
      </div>
    `;
  document.getElementById("data").innerHTML = body;

  const deleteButton = document.querySelector(".eliminar-mail");
  deleteButton.addEventListener("click", () => {
    const messageId = deleteButton.id;

    const deleteUrl = `https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/${tipoMail}/${messageId}`;
    console.log(deleteUrl);
    fetch(deleteUrl, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          alert("Mail borrado");
          const mailElement = document.getElementById(`mail-${correo.id}`);
          mailElement.parentNode.removeChild(mailElement);
          loadData(currentUrl);
        } else {
          alert("mail no borrado");
        }
      })
      .catch((error) => console.log(error));
  });
};

// BOTONES

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("inbox").addEventListener("click", () => {
    const currentUrl =
      "https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/inbox";
    tipoMail = "inbox";
    loadData(currentUrl);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("important").addEventListener("click", () => {
    const currentUrl =
      "https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/important";
    tipoMail = "important";
    loadData(currentUrl);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("starred").addEventListener("click", () => {
    const currentUrl =
      "https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/starred";
    tipoMail = "starred";
    loadData(currentUrl);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("sent").addEventListener("click", () => {
    const currentUrl =
      "https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/sent";
    tipoMail = "sent";
    loadData(currentUrl);
  });
});

// FUNCION METODO POST PARA COLOCAR MAIL EN SENT

function sendEmail() {
  const from = document.getElementById("from").value;

  const to = document.getElementById("to").value;

  const subject = document.getElementById("subject").value;

  const message = document.getElementById("message").value;

  const email = {
    from: {
      name: from,
      email: from,
      avatar: "assets/images/avatars/default.jpg",
    },
    to: [{ name: to, email: to }],
    subject: subject,
    message: message,
    time: new Date(),
    read: false,
    starred: false,
    important: false,
    hasAttachments: false,
    labels: [],
  };

  fetch(
    "https://academia.tim.teknosgroup.com/zuluagal-ht31/api/messages/sent",
    {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("Email sent successfully!");
        closeCompose();
      } else {
        alert("Error sending email.");
      }
    })
    .catch((error) => {
      alert("Error sending email: " + error.message);
    });
}

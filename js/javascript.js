

const quizContainer = document.getElementById("quiz");
const btnReiniciar = document.getElementById("reiniciar");
const imagenResultado = document.getElementById("imagenResultado");


//array con las preguntas y opciones
const preguntas = [
  {
    texto: "¿Qué paleta prefieres?",
    opciones: [
      { texto: "Colores pastel", valor: "minimal", img: "img/pastel.jpg" },
      { texto: "Colores intensos", valor: "popart", img: "img/popart.jpg" },
      { texto: "Neutros con dorado", valor: "elegante", img: "img/elegante.jpg" },
    ]
  },

  {
    texto: "¿Qué estilo de tipografía te atrae más?",
    opciones: [
      { texto: "Sans serif moderno", valor: "minimal", img: "img/sans.jpg" },
      { texto: "Handwritten / Brush", valor: "popart", img: "img/handwritten.jpg" },
      { texto: "Serif clásica", valor: "elegante", img: "img/serif.jpg" },
    ]
  },

  {
    texto: "¿Qué composición te reprensenta mejor?",
    opciones: [
      { texto: "Mucho espacio en blanco", valor: "minimal", img: "img/blanco.jpg" },
      { texto: "Elementos apilados y grandes", valor: "popart", img: "img/apilados.jpg" },
      { texto: "Diseño centrado y simétrico", valor: "elegante", img: "img/centrado.jpg" },
    ]
  },
  {
   texto: "¿Qué estilo de fotografía te atrae más?",
    opciones: [
      { texto: "Luz natural y fondos neutros", valor: "minimal", img: "img/natural.jpg" },
     { texto: "Colores saturados y ángulos extremos", valor: "popart", img: "img/angulo.jpg" },
      { texto: "Tonos cálidos, detalles cuidados", valor: "elegante", img: "img/detalle.jpg" },
   ]
},
{
    texto: "¿Qué textura te atrae más?",
    opciones: [
      { texto: "Superficies lisas y planas", valor: "minimal", img: "img/lisa.jpg" },
      { texto: "Texturas visuales con puntos y patrones", valor: "popart", img: "img/patrones.jpg" },
      { texto: "Mármol, terciopelo o detalles decorativos", valor: "elegante",img: "img/terciopelo.jpg" }
    ]
  },
   {
    texto: "¿Qué sensación quieres que transmita tu diseño?",
    opciones: [
      { texto: "Claridad y orden" ,  valor: "minimal" , img: "img/claridad.jpg"},
      { texto: "Diversión y rebeldía", valor: "popart" , img: "img/diversion.jpg"},
      { texto: "Lujo y distinción", valor: "elegante" , img: "img/lujox2.jpg" }
    ]
  },
  {
  texto: "¿Qué forma geométrica te representa mejor?",
  opciones: [
    { texto: "Rectángulo o cuadrado", valor: "minimal", img: "img/cuadrado.jpg" },
    { texto: "Estrella o rayo", valor: "popart" , img: "img/estrella.jpg"},
    { texto: "Círculo con ornamentos", valor: "elegante", img: "img/circulo.jpg" }
  ]
}
//   {
//     texto: "¿Cuál sería tu diseño soñado?",
//     opciones: [
//       { texto: "Diseño de app limpia", valor: "minimal", img: "img/app.jpg" },
//       { texto: "Portada de revista excéntrica", valor: "popart", img: "img/revista.jpg" },
//       { texto: "Identidad de marca de lujo", valor: "elegante", img: "img/lujo.jpg" },
//     ]
//   }
]

//variables para guardar la pregunta y estado actual de quiz
let respuestas = [];
let preguntaActual = 0;

//funcion para mostrar la pregunta actual en pantalla
function mostrarPregunta() {
  const p = preguntas[preguntaActual];
  quizContainer.innerHTML = `
    <div class="pregunta" data-aos="fade-up">${p.texto}</div>
    <div class="opciones">
      ${p.opciones
        .map(
          (op) => `
        <div class="opcion" data-valor="${op.valor}" data-aos="zoom-in">
          <img src="${op.img}" alt="${op.texto}" />
          <span>${op.texto}</span>
        </div>`
        )
        .join("")}
    </div>
  `;

  //agregar evento click a cada opcion para cpaturar respuesta y avanzar en el quiz
  document.querySelectorAll(".opcion").forEach((btn) =>
    btn.addEventListener("click", () => {
      respuestas.push(btn.getAttribute("data-valor")); //guarda respuesta
      preguntaActual++; //avanza a la siguiente
      if (preguntaActual < preguntas.length) {
        mostrarPregunta(); //mostrar siguiente pregunta
        AOS.refresh(); //refrescar animacion AOS
      } else {
        mostrarResultado(); //mostrar resultado final cuando se acaben las preguntas del quiz
      }
    })
  );
}

//funcion para calcular por conteo y mostrar el resultado final
function mostrarResultado() {
  //contar cuantas veces se seleccionó cada estilo
  const conteo = respuestas.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  //determina el estilo del ganador (el que ha seleccionado mas)
  const estiloGanador = Object.keys(conteo).reduce((a, b) =>
    conteo[a] > conteo[b] ? a : b
  );

  //texto descriptivo para cada estilo
  const textos = {
    minimal: "Tu estilo es MINIMALISTA: limpio, claro y moderno.",
    popart: "Tu estilo es POP ART: atrevido, colorido y expresivo.",
    elegante: "Tu estilo es ELEGANTE: sofisticado, con clase y atemporal."
  };

  //imagenes relacionadas con cada estilo para mostrar resultado
  const imagenes = {
    minimal: "img/resultado-minimal.jpg",
    popart: "img/resultado-popart.jpg",
    elegante: "img/resultado-elegante.jpg"
  };

  //mostrar texto e imagen del estilo ganador
  quizContainer.innerHTML = `<div class="resultado">${textos[estiloGanador]}</div>`;
  imagenResultado.src = imagenes[estiloGanador];
  imagenResultado.style.display = "block";
  btnReiniciar.classList.remove("hidden");
}


//evento para reiniciar el quiz y limpiar todos los datos
btnReiniciar.addEventListener("click", () => {
  respuestas = []; //limpia respuestas
  preguntaActual = 0; //volver a primera pregunta
  btnReiniciar.classList.add("hidden"); //ocultar boton reiniciar
  imagenResultado.style.display = "none"; //ocultar imagen resultado
  mostrarPregunta(); //mostrar la primera pregunta otra vez
});

//mostrar la primera pregunta al cargar la página
mostrarPregunta();


// TIENDA

//array con productos disponibles para la tienda con precios e icono
const productos = [
  { nombre: "Logo", precio: 40, img: "img/tienda/logo.jpg", descripcion: "Un logo creado exclusivamente para ti." },
  { nombre: "Tarjeta", precio: 30, img: "img/tienda/tarjeta.jpg", descripcion:"Una tarjeta diseñada para construir conexión.Enhorabuena, la reunión ha sido un éxito. ¿Por qué no dejar a tu cliente con un mejor sabor de boca entregándole una tarjeta a la altura?"},
  { nombre: "Papelería", precio: 30, img: "img/tienda/papeleria.jpg", descripcion:"Completa tu imagen corporativa con una bonita papelería. El último toque profesional para tu oficina. Lanza un concursos y nuestros diseñadores crearán para ti una papelería que te encantará." },
  { nombre: "Publicidad", precio: 45, img: "img/tienda/publicidad.jpg", descripcion:"Flyer, despegables, trípticos, dípticos, folletos, panfletos, cartelería, gigantografía, banner, rotulación." },
  { nombre: "Manual de Marca", precio: 240, img: "img/tienda/manual.jpg", descripcion:"Convierte tu logo en marca. Un diseñador profesional creará para ti una guía de marca para que puedas trabajar con ella en el futuro." },
  { nombre: "Libro", precio: 50, img: "img/tienda/libro-revista.jpg", descripcion:"Acabas de escribir el best-seller de la temporada. Ahora solo necesitas una portada que esté a la altura." },
  { nombre: "Ilustración", precio: 40, img: "img/tienda/ilustracion.jpg", descripcion:"Ninguna imagen cuenta una historia mejor que una bonita ilustración. ¿Necesitas el diseño de un mural o las ilustraciones para un libro?" },
  { nombre: "Merchandising", precio: 40, img: "img/tienda/merchandising.jpg", descripcion:"¿Quieres vestir a la última moda? ¿Por qué no diseñarla tú mismo? Lanza ahora un concurso de diseño y nuestros diseñadores crearán la camiseta perfecta para ti." },
  { nombre: "Redes Sociales", precio: 20, img: "img/tienda/redes.jpg", descripcion:"Convierte el tráfico de tu web en número de ventas con una bonita landing page, ese lugar donde tu empresa brillará en la red" },
];

//array para guardar los productos añadidos a la cesta
let cesta = [];
//variable para controlar si la cesta está visible o no
let cestaVisible = false;

//cargar cesta desde localStorage si existe
const cestaGuardada = localStorage.getItem('cesta');
if (cestaGuardada) {
  cesta = JSON.parse(cestaGuardada);
}

//función para mostrar todos los productos disponibles en la tienda
function mostrarProductos() {
 const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";
  productos.forEach((producto, index) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}€</p>
        <div class="descripcion">${producto.descripcion}</div>
        <button onclick="agregarACesta(${index})">Añadir</button>
      </div>
    `;
  });
}

//función para agregar un producto a la cesta por su índice
function agregarACesta(index) {
  const productoSeleccionado = productos[index];
  const existente = cesta.find(p => p.nombre === productoSeleccionado.nombre);

  if (existente) {
    existente.cantidad++;
  } else {
    cesta.push({ ...productoSeleccionado, cantidad: 1 });
  }

  actualizarCesta();
}

//función para actualizar visualmente la cesta, su total y sus botones
function actualizarCesta() {
  const lista = document.getElementById("items-cesta");
  const total = document.getElementById("total");
  const contador = document.getElementById("contador-cesta");
  const btnComprar = document.getElementById("btn-comprar");
  const btnVaciar = document.querySelector("#cesta button[onclick='vaciarCesta()']");

  //guardar cesta actualizada en localStorage
  localStorage.setItem('cesta', JSON.stringify(cesta));

  lista.innerHTML = "";
  let suma = 0;

  cesta.forEach((item, i) => {
    lista.innerHTML += `
      <li>
        ${item.nombre} - ${item.precio}€ x ${item.cantidad}
        <button onclick="decrementarCantidad(${i})">−</button>
        <button onclick="incrementarCantidad(${i})">+</button>
      </li>`;
    suma += item.precio * item.cantidad;
  });

  total.innerText = suma + "€";
  contador.innerText = cesta.reduce((acc, prod) => acc + prod.cantidad, 0);

  const mostrarBotones = cesta.length > 0;
  btnComprar.style.display = mostrarBotones ? "inline-block" : "none";
  btnVaciar.style.display = mostrarBotones ? "inline-block" : "none";
}

//funciones para modificar cantidades
function incrementarCantidad(i) {
  cesta[i].cantidad++;
  actualizarCesta();
}

function decrementarCantidad(i) {
  cesta[i].cantidad--;
  if (cesta[i].cantidad <= 0) {
    cesta.splice(i, 1);
  }
  actualizarCesta();
}

//función para vaciar toda la cesta
function vaciarCesta() {
  cesta = [];
  actualizarCesta();
}

//función para mostrar/ocultar la cesta
function toggleCesta() {
  const cestaDiv = document.getElementById("cesta");
  cestaVisible = !cestaVisible;
  cestaDiv.style.display = cestaVisible ? "block" : "none";
}

//función que simula la compra
function realizarCompra() {
  alert("¡Gracias por tu compra! 😊");
  vaciarCesta();
  toggleCesta();
}

//mostrar productos al cargar la página
mostrarProductos();

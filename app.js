function loadImage(url) {
  return new Promise(resolve =>{
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = "blob";
      xhr.onload = function (e) {
          const reader = new FileReader();
          reader.onload = function(event) {
              const res = event.target.result;
              resolve(res);
          }
          const file = this.response;
          reader.readAsDataURL(file);
      }
      xhr.send();
  });
}

let signaturePad = null;
let signaturePad2 = null;
let signaturePad3 = null;

window.addEventListener('load', async () => {
  //canvas1 es la variable y abajo en el new la declaramos, esto aplica para la firma 1 del propietario
  const canvas1 = document.getElementById("canvas1");
  canvas1.height = canvas1.offsetHeight;
  canvas1.width = canvas1.offsetWidth;

  signaturePad = new SignaturePad(canvas1, {});

  const canvas2 = document.getElementById("canvas2");
  canvas2.height = canvas2.offsetHeight;
  canvas2.width = canvas2.offsetWidth;

  signaturePad2 = new SignaturePad(canvas2, {});

  const canvas3 = document.getElementById("canvas3");
  canvas3.height = canvas3.offsetHeight;
  canvas3.width = canvas3.offsetWidth;

  signaturePad3 = new SignaturePad(canvas3, {});

const form = document.querySelector('form');


  form.addEventListener('submit', (e) => {
      e.preventDefault();

      //Informacion general de la propiedad
      let dia = document.getElementById('dia').value
      let mes = document.getElementById('mes').value
      let año = document.getElementById('año').value
      let inmueble = document.getElementById('inmueble').value
      let operacion = document.getElementById('operacion').value
      let nombreInmueble = document.getElementById('nombreInmueble').value
      let direccion = document.getElementById('direccion').value
      let colonia = document.getElementById('colonia').value
      let descripcion = document.getElementById('descripcion').value
      let precio = document.getElementById('precio').value
      let condiciones = document.getElementById('condiciones').value
      let comision = document.getElementById('cantidad').valueAsNumber;
      let caracteristicas = document.getElementById('caracteristicas').value
      let documentacion = document.getElementById('documentacion').value
      //Informacion del propietario
      let propietarioinfo = document.getElementById('propietarioinfo').value
      let celular = document.getElementById('celular').value
      let correo = document.getElementById('correo').value
      let direccionpropietario = document.getElementById('direccionpropietario').value
      //Nombre del propietario y del agente
      let propietario = document.getElementById('propietario').value
      let agente = document.getElementById('agente').value

      generatePDF(dia, mes, año, inmueble, operacion, nombreInmueble, direccion, colonia, descripcion, precio, 
          condiciones, comision, caracteristicas, documentacion, propietarioinfo, celular, correo,
          direccionpropietario,propietario, agente);     
  })
});

async function generatePDF(dia, mes, año, inmueble, operacion, nombreInmueble, direccion, colonia, descripcion, precio, 
  condiciones, comision, caracteristicas, documentacion, propietarioinfo, celular, correo,
  direccionpropietario,propietario, agente) {
  const image = await loadImage("formulario.jpg");
  const signatureImage = signaturePad.toDataURL();
  const signatureImage2 = signaturePad2.toDataURL();
  const signatureImage3 = signaturePad3.toDataURL();
 
  const pdf = new jsPDF('p', 'pt', 'letter');

  pdf.addImage(image, 'PNG', 1, 1, 600, 800); 
  pdf.addImage(signatureImage, 'PNG', 400, 530, 70, 40); //firma 1
  pdf.addImage(signatureImage2, 'PNG', 400, 600, 70, 40); //firma 2
  pdf.addImage(signatureImage3, 'PNG', 270, 650, 70, 40); //firma 3

  pdf.setFontSize(9); //tamaño de los textos
    pdf.text(dia, 304, 128);
    pdf.text(mes, 334, 128);
    pdf.text(año, 405, 128);
    pdf.text(inmueble,153,186);
    pdf.text(operacion, 271,186);
    pdf.text(nombreInmueble, 425, 186);
    pdf.text(direccion, 122, 221);
    pdf.text(colonia, 257, 222);
    pdf.text(descripcion, 130, 257);
    pdf.text(precio, 251, 257);
    pdf.text(condiciones, 387, 257);
    pdf.text(120, 280, '' + comision);
    pdf.text(caracteristicas, 144, 304);
    pdf.text(documentacion, 147, 328);
    pdf.text(propietarioinfo, 195, 351);
    pdf.text(celular, 149, 375);
    pdf.text(correo, 413, 375);
    pdf.text(direccionpropietario, 121, 417);


  


    pdf.text(propietario, 157, 571);
    pdf.text(agente, 143, 642);
    
    

  pdf.save("pdfejemplo.pdf");
}

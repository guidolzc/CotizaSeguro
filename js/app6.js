// CONSTRUCTOR PARA SEGUROS
class Seguro{
     constructor(marca, anio, tipo){
                this.marca = marca;
                this.anio = anio;
                this.tipo = tipo;
     }
    cotizarSeguro() {
        /*console.log(this.marca);
        console.log(this.anio);
        console.log(this.tipo);*/
        /*
            1 = americano 1.15
            2 = asiatico 1.05
            3 = europeo 1.35
    
        */  
        let cantidad ;
        const base = 2000;
    
        switch (this.marca){
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                    cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
        // leer el año  los años de diferencia de un coche
        const diferencia = new Date().getFullYear() - this.anio;
        
        // CADA AÑO DE DIFERENCIA HAY QUE REDUCIR 3 % DE VALOR DEL SEGURO
        cantidad -= ((diferencia * 3)) * cantidad / 100; 
        /* 
            si el seguro es basico se multiplica por 30 % mas
            si el seguro es completo 50 % mas
        */
       if (this.tipo === 'basico') {
           cantidad *= 1.30;
    
       }else {
           cantidad *= 1.50;
       }
      return cantidad;
    
    
    
        //console.log(diferencia);
        //console.log(cantidad);
    
    }
     
}



//  todo LO QUE SE MUESTRA
class Interfaz{
    // MENSAJE QUE SE IMPRIME EN EL HTML
     mostrarMensaje(mensaje, tipo){// crea el prototype
    const div = document.createElement('div');// CREA EL DIV 
    if(tipo === 'error'){
        div.classList.add('mensaje','error');

    }else {
        div.classList.add('mensaje','correcto');
    }
    div.innerHTML = `${mensaje}`; // INSERTA EN EL DIV EL MENSAJE
    formulario.insertBefore(div, document.querySelector('.form-group'));// inserta ANTES DE LA FILA MARCA
    
    setTimeout(function() {
        document.querySelector('.mensaje').remove();// REMUEVE EL MENSAJE DE ERROR
    },3000);
}

// IMPRIME EL RESULTADO DE LA COTIZACION
    mostrarResultado(seguro, total){
    const resultado = document.getElementById('resultado');
    let marca;
    // console.log(seguro);

    switch(seguro.marca){
        case '1':
             marca = 'Americano';
            break;
        case '2':
             marca = 'Asiatico';
            break;    
        case '3':
             marca = 'Americano';
            break; 
    }
    // crear un DIV
    const div = document. createElement('div');
    // INSERTAR LA INFORMACION
    div.innerHTML = `
        <p class= 'header'> tu resumen: </p>
        <p> marca:${marca} </p>
        <p> Año:${seguro.anio} </p>
        <p> Tipo:${seguro.tipo} </p>
        <p> total: ${total}</p>
    `;

    // INSERTO LA IMAGEN DE CARGANDO.....
    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';// muestra la imagen
    // OCULTAR IMAGEN.....
    setTimeout(function(){ // 

       spinner.style.display= 'none';// OCULTA LA IMAGEN CARGAndo.....
       resultado.appendChild(div);

    //console.log(marca);
    },3000);// 3 seg se muestra y se va
}

}

 



// EVENTLISTERNET
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    // leer la marca SELECCIONADA DEL SELECT
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    //console.log(marcaSeleccionada);
    //console.log('Presionaado');

    // LEER EL AÑO SELECCIONADO DEL <SELECT>
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    //console.log(anioSeleccionado);

    // LEE EL VALOR  del RADIO BUTTON
    // copio de documento a value y pego en console y veo que topo es
    const tipo = document.querySelector('input[name= "tipo"]:checked').value;

    //Crear Instancia de INTERFAZ
    const interfaz = new Interfaz();

    // Revisamos que si los campos estan vacios

    if (marcaSeleccionada ===''|| anioSeleccionado === '' || tipo === ''){
        // interfaz imprimiendo un error
        interfaz.mostrarMensaje('faltan datos, revisar el formulario y prueba de nuevo','error');// MENSAJE
        //console.log('Faltan Datos');
    }else {
         // LIMPIAR RESULTADOS ANTERIORES
         const resultados = document.querySelector('#resultado div');
         if (resultados != null){
             resultados.remove();
         }



        // instanciar seguro y mostrar interfaz
        //console.log('todo correcto')
        const seguro = new Seguro (marcaSeleccionada,anioSeleccionado,tipo);
        //console.log(seguro);
        // COTIZAR EL SEGURO
        const cantidad = seguro.cotizarSeguro();
        

        // MOSTRAR EL RESULTADO
         interfaz.mostrarResultado(seguro, cantidad);
         interfaz.mostrarMensaje('Cotizando...','exito');// MENSAJE
 
    }
  
});
const max = new Date().getFullYear(),
      min = max-20;
const selectAnios = document.getElementById('anio');
for (let i= max; i>= min; i--){
    let option = document.createElement('option');
    option.value = i; // se agrega en HTML como value 
    option.innerHTML = i; // tambien se agrega en html alado de value 
    selectAnios.appendChild(option);
}







  
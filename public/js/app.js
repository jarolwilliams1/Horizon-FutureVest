const NombrePais = document.getElementById("nombre-pais-input").value;
const CodigoIsoPais = document.getElementById("ISO-pais-input").value;

fetch("agregarpais",{

    method:"POST",

    headers:{

        "Content-Type":"application/json"

    },

    body:JSON.stringify({

         NombrePais,
       CodigoIsoPais

    })


//
});




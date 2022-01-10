---
sidebar_position: 3
---

# Async/Await con jQuery y Ajax

Si eres como yo, probablemente estarás aburrido de usar peticiones `ajax` con jQuery. Es algo que está en todas partes, en miles y miles de proyectos.

No he venido a criticar jQuery, de hecho, me parece una librería super útil, que ahorra tiempo y a la que por alguna razón le he cogido cariño.

`async/await` es una característica bastante nueva. Fue añadida en la especificación ES2017 hace 4 años más o menos y ahora está disponible de forma nativa en la mayoría de los navegadores modernos. No hay razón para no usarla en tu código JavaScript actual.

Si quieres soportar navegadores más antiguos (o el viejo IE), tendrás que usar un transpilador como Babel para que funcione en navegadores antiguos.

## En la época de ajax 🧓

Antes teníamos este tipo de funciones para consumir datos mediante `ajax`

```javascript
function myAjax() {
  $.ajax({
    url: ajaxurl,
    type: "POST",
    data: {
      stuff: "here",
    },
    success: function (data) {
      //Las locas respuestas de las peticiones anidadas van aquí
      var response = data;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Vacio casi siempre 😆
    },
  });

  return response;
}
```

## Código síncrono vs código asíncrono:

- **Síncrono**:

  Estás en una cola para conseguir una entrada de cine. No puedes conseguirla hasta que todos los que están delante de ti la consigan, y lo mismo ocurre con las personas que hacen cola detrás de ti.

- **Asíncrono**:

  Estás en un restaurante con muchas otras personas. Pides tu comida. Otras personas también pueden pedir su comida, no tienen que esperar a que tu comida esté cocinada y servida para poder pedir. En la cocina, los trabajadores del restaurante están continuamente cocinando, sirviendo y tomando pedidos. La gente tendrá su comida servida tan pronto como esté cocinada.

## ¿Cómo usar async/await con jQuery? 🤹

Si partimos del anterior código, un ejemplo de `async/await` con `ajax` podría ser:

```javascript
async function myAjax(param) {
  const result = await $.ajax({
    url: ajaxurl,
    type: "POST",
    data: param,
  });

  return result;
}
```

Y es en el return donde devolvemos el resultado de la petición si no hubiera errores. Para capturar los errores podemos hacer lo siguiente:

```javascript
async function myAjax(param) {
  let result;

  try {
    result = await $.ajax({
      url: ajaxurl,
      type: "POST",
      data: param,
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}
```

Okay fácil ¿no? ¿Cómo consumimos está función maravillosa? 😎 Así:

```javascript
// En otra parte del código, dentro de una función asíncrona
const data = await myAjax();
```

Otra opción sería usar promesas:

```javascript
myAjax().then((data) => {
  console.info("Response:", data);
});
```

Las promesas no son una mala opción, y pueden parecer más limpias o ser más fácil trabajar con ellas, depende del contexto.

Espero que te haya gustado este artículo. ❤️

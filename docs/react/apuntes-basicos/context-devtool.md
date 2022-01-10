---
sidebar_position: 9
---

# React Context DevTool

Últimamente no tengo tiempo para nada, entre vacaciones y el nuevo trabajo no paro nada de nada. Me paso el día estudiando y estudiando 🤓.

Hace poco pensaba, como en multitud de sitios Context API se va abriendo hueco y Redux en muchos casos deja de usarse. No se exactamente si esto realmente es una buena o mala práctica. Supongo que depende. Pero si hay algo que se lee mucho en los foros y las documentaciones es que Context API no es un state management.

No voy a entrar en la polémica, solo pretendo introduciros una utilidad que echaba de menos desde Redux. Y así, como Redux tiene sus Redux Devtools, que permiten saber qué narices está pasando con el estado de nuestra aplicación, no dejaba de preguntarme su existía algo aplicable a los contextos.

Pues bien, existe, se llama <a href="https://github.com/deeppatel234/react-context-devtool" target="_blank" rel="noopener noreferrer">`React Context DevTool`</a>, y cómo no, tenemos las extensiones propias para <a href="https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf" target="_blank" rel="noopener noreferrer">Chrome</a> y <a href="https://addons.mozilla.org/en-US/firefox/addon/react-context-devtool/" target="_blank" rel="noopener noreferrer">Firefox</a>.

Ahora puedes depurar fácilmente tu contexto en tu aplicación React con vistas de árbol, raw y diff. 😄

## Instalación

1. Descarga la extensión para <a href="https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf" target="_blank" rel="noopener noreferrer">Chrome</a> o <a href="https://addons.mozilla.org/en-US/firefox/addon/react-context-devtool/" target="_blank" rel="noopener noreferrer">Firefox</a>.
2. Añade la propiedad `displayName` en el `Provider`

```javascript
<MyContext.Provider
  value={{ a: "hello", b: "world" }}
  displayName="Context Display Name"
>
  <YourComponent />
</MyContext.Provider>
```

o bien asigna el nombre a mostrar en el `Context`:

```javascript
MyContext.displayName = "Context Display Name";
```

¡Y listo! 🥳

Espero que te haya gustado este artículo. ❤️

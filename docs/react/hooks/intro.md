---
sidebar_position: 1
---

# Intro

## Las reglas de Hooks

Es importante entender **en qué lugares** de tu código puedes definir efectos. Necesitas seguir las reglas para usar Hooks:

1. Los Hooks sólo pueden ser **invocados** desde la **función de nivel superior** que constituye tu componente funcional React.
2. Los Hooks **no pueden ser llamados** desde **código anidado** (por ejemplo, bucles, condiciones, u otro cuerpo de función).
3. Los **Custom Hooks son funciones especiales**, sin embargo, y los Hooks pueden ser llamados desde la función de nivel superior del Hook personalizado. Además, la regla dos también es cierta.

## React Hooks ESLint plugin

Hay un práctico **[plugin de ESLint](https://www.npmjs.com/package/eslint-plugin-react-hooks)** que te ayuda a seguir las reglas de Hooks. Te avisa si violas una de las reglas.

Ten en cuenta que el plugin no es omnisciente. Tienes que aceptar que el plugin de ESLint -aunque es impresionante- no puede entender el comportamiento en tiempo de ejecución de tu código. Sólo puede aplicar el análisis de código estático.

Reduce la propensión a los errores y aumenta la robustez.

Echa un vistazo a las sugerencias proporcionadas; podrían permitirte nuevas ideas sobre conceptos que no has entendido completamente. Merece la pena buscar en Google el mensaje para saber más sobre el fondo de las discusiones.

Dicho esto, no hay que ser tan dogmático como para satisfacer el plugin todo el tiempo.

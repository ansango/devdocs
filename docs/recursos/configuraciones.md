---
sidebar_position: 1
---

# Configuraciones

## Sistema operativo

Esta es una elección muy particular, yo en lo personal prefiero trabajar con Linux, en concreto con la distribución de **[Ubuntu](https://ubuntu.com/)**. 

En el trabajo utilizo Windows, y en el pasado utilizaba MacOS. 

He pasado por los tres sistemas y desde luego todos los recursos que publico, exceptuando los que son específicos para Linux o Ubuntu, están disponibles para todos o casi todos los sistemas.

### Linux

- <a href="/linux/configurar-ubuntu" target="_blank" rel="noopener noreferrer">Configurar Ubuntu 20.04 / 21.04</a>
- [Wireless restore](https://askubuntu.com/questions/1182722/intel-wireless-ac-9462-not-working-w-18-04-lts)
- [Touchpad restore](https://askubuntu.com/questions/528293/is-there-a-way-to-restart-the-touchpad-driver)

## Terminal

Al utilizar Linux, trabajaremos con `Bash`, en Windows tenemos Power Shell y personalmente no la tengo tan interiorizada. Yo utilizo `oh my zsh` que tiene temas con colores y es muy configurable. Aquí tienes una guía de `Bash` y también un artículo con los comandos más utilizados.

- [The Bash Guide](https://guide.bash.academy/)
- [ZSH](https://ohmyz.sh/)
- <a href="/linux/comandos-bash/intro" target="_blank" rel="noopener noreferrer">101 Comandos en Bash</a>


## Navegadores

Otra elección muy personal. La verdad es que me encanta Firefox y tiene unas herramientas que nos ayudan a maquetar y a desarrollar muy intuitivas, pero no te voy a engañar, utilizo Chrome por defecto, vendo consejos que para mi no tengo. Ambos navegadores tienen practicamente las mismas extensiones disponibles, así que elige el que más te guste.

- [Chrome](https://www.google.com/chrome/)
- [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)

**Extensiones**

- [Clear Cache](https://chrome.google.com/webstore/detail/clear-cache/cppjkneekbjaeellbfkmgnhonkkjfpdn?hl=en) - Borra la caché y los datos de navegación con un solo click.
- [ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en) - Selector de colores, generador de degradados y otras cosas.
- [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=en) - Highlighter para JSON.
- [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=en) - Herramienta para mejorar rendimiento, calidad y corrección de tu web.
- [Wappalyzer](https://www.google.com/chrome/) - ¿Quieres saber que tecnologías usa esta web?
- [Octotree](https://chrome.google.com/webstore/detail/octotree-github-code-tree/bkhaagjahfmjljalopjnoealnfndnagc?hl=en) - Explorador de archivos para los repos de Github.
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - Herramientas para debugear React
- [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) - Herramientas para debugear Vue
- [Svelte Devtools](https://chrome.google.com/webstore/detail/svelte-devtools/ckolcbmkjpjmangdbmnkpjigpkddpogn?hl=en) - Herramientas para debugear Svelte
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - Herramientas para debugear Redux

## Control de veriones

Existen varios sistemas de control de versiones. Estas herramientas nos ayudan a que nuestro trabajo quede registrado por versiones, es una manera de volver atrás en el tiempo por si la liamos parda. En mi caso y en el de la mayoría de los mortales, uso `Git`.

**Git**

Puedes ver como instalar `Git` [aquí](https://www.notion.so/blog/linux/configurar-ubuntu#git). También es interesante que le eches más adelante un ojo a [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/), que son un conjunto de extensiones de `Git` para proporcionar operaciones de alto nivel los repositorios.

**Empezar en** `Git`**:**

- [Comandos básicos en Git](https://github.com/susannalles/MinimalEditions/wiki/Lista-Comandos-Git)
- [Explorador de comandos Git](https://gitexplorer.com/)

**Plataformas para repositorios remotos**

- [GitHub](https://github.com/)
- [Bitbucket](https://bitbucket.org/)
- [Gitlab](https://about.gitlab.com/)

**Git avanzado**

- [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/)

## Editores de código

Existen infinidad de editores de código, [Vim](https://www.vim.org/), [Notepad++](https://notepad-plus-plus.org/downloads/), [Atom](https://atom.io/), [SublimeText](https://www.sublimetext.com/), [WebStorm](https://www.jetbrains.com/webstorm/), [VSCode](https://code.visualstudio.com/), etc. Está elección es complicada; al principio pasé por Notepad++, Atom y Sublime, luego me gustaba mucho WebStorm, pero necesitarás licencia, así que finalmente me pasé al que utiliza mucha gente, [VSCode](https://code.visualstudio.com/).

**VSCode**

La verdad es que es un editor genial, tienes infinidad de plugins para adaptar casi cualquier herramienta. Te dejo un enlace con una lista personal de plugins.

- <a href="/vscode/plugins" target="_blank" rel="noopener noreferrer">VS Code Plugins</a>

## Herramientas Clean Code

Aprendiendo a escribir buen código, pero no sabes por dónde empezar... ¿Quitando código muerto? ¿Encontrando variables no utilizadas? ¿Tratando de encontrar patrones problemáticos en tu código? ¿Te suena?

Bueno pues aquí algunas de las herramientas que te ayudarán a superar el drama:

- [ESLint](https://eslint.org/) - es una herramiente que hace Code linting, que es un tipo de análisis estático, utilizado para encontrar patrones problemáticos o código que no se adhiere a ciertas pautas de estilo.
- [Prettier](https://prettier.io/) - herramienta que formatea el código para ti de una manera específica.
- [Stylelint](https://stylelint.io/) - Seguro que no has olvidado lo que hace ESLint, pues Stylelint hace lo mismo con tus CSS.
- [EditorConfig](https://editorconfig.org/) - EditorConfig nos ayudará a establecer un conjunto de reglas para mantener la forma en la que escribimos código. Imagina que en tu equipo tu usas VSCode pero tu compañero usa Atom y no tiene las mismas tabulaciones. Con esta herramienta tendremos una misma manera de leer y escribir código.
- [Lint-Staged](https://github.com/okonet/lint-staged) - ejecutará linters en los staged files, para que el bad code no se suba tu rama.
- [Husky](https://github.com/typicode/husky) - básicamente te permite hacer Git hook. Esto significa que puedes realizar ciertas acciones cuando estás a punto de confirmar o cuando estás a punto de empujar el código a una rama.


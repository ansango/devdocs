---
sidebar_position: 1
---

# Configurar Ubuntu

Normalmente suelo formatear mi ordenador al menos dos veces al año, es una práctica que me gusta hacer para vaciarlo de basura o instalarme de cero alguna versión de Ubuntu nueva. He ido guardando todos los pasos que hago para dejar un Ubuntu listo para empezar a programar.

Lo ideal sería componer todo mediante un script en `bash` que automatizase todos estos procesos de instalación. Te dejo a ti ese trabajo 😄

> He revisado todos los puntos que contiene esta entrada y es totalmente aplicable a la versión 21.04

## Actualización de repositiorios

```bash
sudo apt update
sudo apt -y upgrade
```

## Instalación de Git

```bash
sudo apt -y install git
```

## Soporte para exFAT

```bash
sudo apt -y install exfat-fuse exfat-utils
```

## Instalación de Fonts Powerline y Firacode

```bash
sudo apt -y install fonts-powerline
```

```bash
sudo apt -y install fonts-firacode
```

## Instalación y configuración de `zsh`

Instalamos `curl`

```bash
sudo apt -y install curl
```

Después instalamos `zsh`

```bash
sudo apt -y install git-core zsh
```

```bash
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Accede al archivo de configuración de `zsh`

```bash
nano ~/.zshrc
```

Busca la variable `ZSH_THEME` y actualiza el valor a `agnoster`. Debería quedarte algo así:

```bash
# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="/home/ansango/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="agnoster"

```

Guarda el anterior archivo y a continuación hacemos `zsh` nuestra terminal por defecto

```bash
chsh -s $(which zsh)
```

Necesitaremos reiniciar la sesión para que `zsh` sea nuestra terminal predeterminada.

## Instalación y configuración de Node Version Manager

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

Abrimos el archivo configuración de `zsh` de nuevo:

```bash
nano ~/.zshrc
```

Copiamos y pegamos al final del archivo el siguiente código:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Necesitaremos reiniciar la sesión para que `nvm` funcione

### Como instalar ¿Node?

Podemos obtener el listado de todas las versiones con:

```bash
nvm ls-remote
```

Para instalar `Node.js` y `npm` simplemente ejecutamos:

```bash
nvm install --lts # Para instalar la última versión de larga duración
```

## Instalación de MongoDB

> Para instalar MongoDB puedes seguir esta <a href="/linux/instalar-mongodb" target="_blank" rel="noopener noreferrer">guía</a>

## Dashboard

Hace tiempo utilizaba OSX y me encantaba la interfaz gráfica, básicamente por el Dock y Mission Control. Pero puedes configurar tu distribución de Ubuntu para que tenga esas funcionalidades, siguiendo estos pasos:

### Instalación de Dconf Editor para el Dock

```bash
sudo apt -y install dconf-editor
```

Entramos en Dconf Editor y accedemos a la siguiente ruta para customizar a nuestro gusto el Dock en Ubuntu:

```bash
org/gnome/shell/extensions/dash-to-dock
```

### Instalación de Gnome Tweaks y configuración para "Mission Control"

```bash
sudo apt -y install gnome-tweaks
```

```bash
sudo apt -y install wmctrl
```

Necesitamos instalar el plugin de `Custom Hot Corners`, para ello podemos acceder <a href="https://extensions.gnome.org/extension/1362/custom-hot-corners/" target="_blank" rel="noopener noreferrer">aquí</a> en `Firefox` y activarlo en el botón de switch, o si accedemos desde `Chrome` deberemos instalar un <a href="https://chrome.google.com/webstore/detail/gnome-shell-integration/gphhapmejobijbbhgpjhcjognlahblep" target="_blank" rel="noopener noreferrer">complemento</a> para el navegador

Accedemos a Gnome Tweaks, y en `extensions`, activamos `Custom hot corners`. En el botón de configuración podremos seleccionar las acciones que queremos que se lancen al poner el puntero en cada esquina de nuestra pantalla.

### Instalación de GDM Background

```bash
sudo apt install git make gcc libgtk-3-dev libpolkit-gobject-1-dev
git clone https://github.com/thiggy01/gdm-background.git
cd gdm-background/
make
sudo make install
```

## Aplicaciones que uso

### Google Chrome

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

```bash
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

### Firefox Developer Edition

> Para instalar Firefox Developer Edition puedes seguir esta <a href="/linux/firefox-developer" target="_blank" rel="noopener noreferrer">guía</a>

### Htop

```bash
sudo apt -y install htop
```

### Byobu

```bash
sudo apt -y install byobu
```

### Visual Studio Code

```bash
sudo snap install code --classic
```

Lo ideal es utilizar el plugin `Settings Sync` para tener sincronizados todos nuestros plugins de Visual Studio Code, así solo tendremos que descargarlos.

> Puedes ver la lista de los plugins que uso <a href="/vscode/plugins" target="_blank" rel="noopener noreferrer">aquí</a>

### Postman

```bash
sudo snap install postman
```

### Robo 3T

> Para instalar Robo 3T puedes seguir esta <a href="/linux/instalar-mongodb" target="_blank" rel="noopener noreferrer">guía</a>

### VLC

```bash
sudo snap install vlc
```

### Spotify

```bash
sudo snap install spotify
```

### Balena Etcher

Descarga la última versión de Balena Etcher <a href="https://www.balena.io/etcher/" target="_blank" rel="noopener noreferrer">aquí</a>. Y ya puedes hace un USB booteable.

### Transmission

```bash
sudo apt install transmission
```

### Ghostwriter

Si quieres escribir markdown sin distracciones aquí tienes un editor genial que te ayudará a prescindir de editores

```bash
sudo add-apt-repository ppa:wereturtle/ppa
sudo apt update
sudo apt install ghostwriter
```

## Resetear Touchpad en Ubuntu

> Puedes encontrar algunas soluciones para resetear el touchpad en Ubuntu <a href="/linux/touchpad" target="_blank" rel="noopener noreferrer">aquí</a>

## Reconfigurar Drivers de Nvidia

Si en algún momento has perdido la configuración por defecto de tus drivers privativos de Nvidia y Ubuntu no te permite seleccionarlos en "Additional Drivers", entonces puedes hacer lo siguiente:

En primer lugar, busca qué controlador necesitas. ¿Cómo lo averiguas? Consultando según el modelo de tarjeta que tengas y seleccionando obviamente la opción de _Linux 64-bit_ en **Sistema Operativo** <a href="https://www.nvidia.es/Download/index.aspx?lang=es" target="_blank" rel="noopener noreferrer">aquí</a>. Es recomendable utilizar en **Tipo de descarga** la opción de _Rama de producción_, que suele ser la versión ya testeada y que da menos problemas.

En mi caso tengo una GeForce GTX 1060, así que seleccionaría estas opciones:

- Tipo de producto: GeForce
- Serie del producto: GeForce 10 Series
- Familia del producto: GeForce 1060
- Sistema operativo: Linux 64-bit
- Tipo de descarga: Rama de producción
- Idioma: Español (España)

A continuación le damos a buscar, y podremos descargarlo, pero si no te apetece ejecutar un .run, es más fácil quedarnos con el número de versión del driver. En mi caso la **470.63.01**

Abrimos un terminal y ejecutamos:

```bash
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
sudo apt install nvidia-driver-470
```

Después de la instalación reiniciamos `reboot`, y ya deberíamos tener aplicado el controlador de nuevo.

Y hasta aquí toda la configuración base de mi Ubuntu ❤️. Se que son unas cuantas cositas, por ello lo he distribuido en otras entradas. Espero que te haya servido 😸

---
sidebar_position: 4
---

# Touchpad

Vale, me ha pasado y me he vuelto loco, tengo un portátil de Xiaomi que va muy bien, pero a veces deja de funcionar el touchpad, y evidentemente es algo que me hace muy poca gracia. 

Este laptop es chino y con piezas que dan problemas de configuración con el kernel de linux. 😲

Para arreglar este problema he encontrado dos soluciones. Una no me ha funcionado las últimas veces que se me ha congelado el touchpad, y la segunda es la que actualmente uso. Espero que si te sucede algo parecido te sirva! 😄

## Solución 1 - Archivo restore.sh

Esta solución consiste en crear un archivo `.sh` para que cada vez que nos pase este dichoso problema podamos ejecutarlo y resetear nuestro touchpad.

Pero antes de nada necesitaremos la información de nuestro punto de entrada del touchpad. Para ello podemos consultar los inputs mediante:

```bash
xinput --list
```

En mi caso es este:

```bash
ELAN2304:00 04F3:30FE Touchpad
```

Creamos un archivo `.sh`, escribimos lo siguiente:

```bash
xinput disable 'ELAN2304:00 04F3:30FE Touchpad'
xinput enable 'ELAN2304:00 04F3:30FE Touchpad'
```

Le damos permisos de ejecución:

```bash
chmod +x touchpad-reset.sh
```

Y ejecutamos:

```bash
./touchpad-reset.sh
```

## Solución 2 - Grub

Abrimos terminal y accedemos al archivo de configuración del `grub`:

```bash
sudo nano /etc/default/grub
```

Copiamos y pegamos lo siguiente:

```

GRUB_DEFAULT=0
GRUB_TIMEOUT_STYLE=hidden
GRUB_TIMEOUT=0
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
GRUB_CMDLINE_LINUX="i8042.nopnp=1 pci=nocrs"

```

Guardamos y reiniciamos

La verdad espero que no te veas en esta tesitura, y si es así, espero que estas soluciones te ayuden 😄

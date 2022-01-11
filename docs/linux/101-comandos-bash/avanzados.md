---
sidebar_position: 3
---

# Comandos Avanzados

## Superusuario

### `sudo / su`

Puedes comprobar cuál es tu nombre de usuario con `whoami`:

```bash
[ andrew@pc01 abc ]$ whoami
andrew
```

...y ejecutar un comando como otro usuario con `sudo -u username` (necesitará la contraseña de ese usuario):

```bash
[ andrew@pc01 abc ]$ sudo -u test touch def && ls -l
total 0
-rw-r--r-- 1 test test 0 Jan 11 20:05 def
```

Si no se proporciona `-u`, el usuario por defecto es el superusuario (normalmente llamado "root"), con permisos ilimitados:

```bash
[ andrew@pc01 abc ]$ sudo touch ghi && ls -l
total 0
-rw-r--r-- 1 test test 0 Jan 11 20:05 def
-rw-r--r-- 1 root root 0 Jan 11 20:14 ghi
```

Utiliza `su` para convertirte en otro usuario temporalmente (y `exit` para volver a cambiar):

```bash
[ andrew@pc01 abc ]$ su test
Password:
test@pc01:/home/andrew/abc$ whoami
test
test@pc01:/home/andrew/abc$ exit
exit

[ andrew@pc01 abc ]$ whoami
andrew
```

### `!!`

El superusuario (normalmente "root") es la única persona que puede instalar software, crear usuarios, etc. A veces es fácil olvidarse de eso, y puedes obtener un error:

```bash
[ andrew@pc01 ~ ]$ apt install ruby
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?
```

Puedes volver a escribir el comando y añadir sudo al principio (ejecutarlo como superusuario):

```bash
[ andrew@pc01 ~ ]$ sudo apt install ruby
Reading package lists...
```

O bien, puedes utilizar el atajo de teclado !!, que conserva el comando anterior:

```bash
[ andrew@pc01 ~ ]$ apt install ruby
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?

[ andrew@pc01 ~ ]$ sudo !!
sudo apt install ruby
Reading package lists...
```

Por defecto, ejecutar un comando con `sudo` (e introducir correctamente la contraseña) permite al usuario ejecutar comandos de superusuario durante los siguientes 15 minutos. Una vez transcurridos esos 15 minutos, el usuario volverá a tener que introducir la contraseña de superusuario si intenta ejecutar un comando restringido.

## Permisos de archivo

### Permisos de archivos

Los archivos pueden ser leídos (r), escritos (w), y/o ejecutados (x) por diferentes usuarios o grupos de usuarios, o no serlo. Los permisos de los archivos se pueden ver con el comando `ls -l` y se representan con 10 caracteres:

```bash
[ andrew@pc01 ~ ]$ ls -lh
total 8
drwxr-xr-x 4 andrew andrew 4.0K Jan  4 19:37 tast
-rwxr-xr-x 1 andrew andrew   40 Jan 11 16:16 test
-rw-r--r-- 1 andrew andrew    0 Jan 11 16:34 tist
```

El primer carácter de cada línea representa el tipo de archivo, (`d` = directorio, `l` = enlace, `-` = archivo normal, etc.); luego hay tres grupos de tres caracteres que representan los permisos que tiene el usuario (u) propietario del archivo, los permisos que tiene el grupo (g) propietario del archivo y los permisos que tiene cualquier otro usuario (o). (El número que sigue a esta cadena de caracteres es el número de enlaces en el sistema de archivos a ese archivo (4 o 1 arriba)).

`r` significa que esa persona / esas personas tienen permiso de lectura, `w` es el permiso de escritura, `x` es el permiso de ejecución. Si un directorio es "ejecutable", significa que puede ser abierto y su contenido puede ser listado. Estos tres permisos suelen representarse con un único número de tres dígitos, donde, si `x` está habilitado, el número se incrementa en 1, si w está habilitado, el número se incrementa en 2, y si `r` está habilitado, el número se incrementa en 4. Tenga en cuenta que estos son equivalentes a dígitos binarios (r-x -> 101 -> 5, por ejemplo). Así que los tres archivos anteriores tienen permisos de 755, 755 y 644, respectivamente.

Las dos siguientes cadenas de cada lista son el nombre del propietario (andrew, en este caso) y el grupo del propietario (también andrew, en este caso). Luego viene el tamaño del archivo, su hora de modificación más reciente y su nombre. La bandera -h hace que la salida sea legible para los humanos (es decir, imprime 4.0K en lugar de 4096 bytes).

### `chmod / chown`

Los permisos de los archivos pueden ser modificados con chmod estableciendo los bits de acceso:

```bash
[ andrew@pc01 ~ ]$ chmod 777 test && chmod 000 tist && ls -lh
total 8.0K
drwxr-xr-x 4 andrew andrew 4.0K Jan  4 19:37 tast
-rwxrwxrwx 1 andrew andrew   40 Jan 11 16:16 test
--------------- 1 andrew andrew    0 Jan 11 16:34 tist
```

...o añadiendo (`+`) o quitando (`-`) los permisos `r`, `w` y `x` con banderas:

```bash
[ andrew@pc01 ~ ]$ chmod +rwx tist && chmod -w test && ls -lh
chmod: test: new permissions are r-xrwxrwx, not r-xr-xr-x
total 8.0K
drwxr-xr-x 4 andrew andrew 4.0K Jan  4 19:37 tast
-r-xrwxrwx 1 andrew andrew   40 Jan 11 16:16 test
-rwxr-xr-x 1 andrew andrew    0 Jan 11 16:34 tist
```

El usuario propietario de un archivo puede cambiarse con `chown`:

```bash
[ andrew@pc01 ~ ]$ sudo chown marina test
```

El grupo al que pertenece un archivo se puede cambiar con `chgrp`:

```bash
[ andrew@pc01 ~ ]$ sudo chgrp hadoop tist && ls -lh
total 8.0K
drwxr-xr-x 4 andrew andrew 4.0K Jan  4 19:37 tast
----------w--w- 1 marina andrew   40 Jan 11 16:16 test
-rwxr-xr-x 1 andrew hadoop    0 Jan 11 16:34 tist
```

## Gestión de usuarios y grupos

### Usuarios

`users` muestra todos los usuarios conectados actualmente. Tenga en cuenta que un usuario puede estar conectado varias veces si -- por ejemplo -- está conectado a través de varias sesiones ssh.

```bash
[ andrew@pc01 ~ ]$ users
andrew colin colin colin colin colin krishna krishna
```

Para ver todos los usuarios (incluso los que no han iniciado sesión), compruebe `/etc/passwd`. (**ADVERTENCIA**: ¡no modifique este archivo! Puede corromper las cuentas de los usuarios y hacer imposible el inicio de sesión en el sistema).

```bash
[ andrew@pc01 ~ ]$ alias au="cut -d: -f1 /etc/passwd \
> | sort | uniq" && au
 _apt
anaid
andrew...
```

Añade un usuario con `useradd`:

```bash
[ andrew@pc01 ~ ]$ sudo useradd aardvark && au
_apt
aardvark
anaid...
```

Eliminar un usuario con `userdel`:

```bash
[ andrew@pc01 ~ ]$ sudo userdel aardvark && au
_apt
anaid
andrew...
```

### Grupos

```bash
[ andrew@pc01 ~ ]$ groups
andrew adm cdrom sudo dip plugdev lpadmin sambashare hadoop
```

```bash
[ andrew@pc01 ~ ]$ alias ag=“cut -d: -f1 /etc/group \
> | sort” && ag
adm
anaid
andrew...
```

```bash
[ andrew@pc01 ~ ]$ sudo groupadd aardvark && ag
aardvark
adm
anaid...
```

```bash
[ andrew@pc01 ~ ]$ sudo groupdel aardvark && ag
adm
anaid
andrew...
```

## Procesamiento de textos

### `uniq / sort / diff / cmp`

```bash
[ andrew@pc01 man ]$ printf "1\n2\n2" > a && \> printf "1\n3\n2" > b

[ andrew@pc01 man ]$ uniq a
1
2
```

```bash
[ andrew@pc01 man ]$ sort b
1
2
3
```

```bash
[ andrew@pc01 man ]$ diff a b
2c2
< 2
--------
> 3
```

```bash
[ andrew@pc01 man ]$ cmp a b
a b differ: char 3, line 2
```

### `cut / sed`

```bash
[ andrew@pc01 man ]$ printf "137.99.234.23" > c

[ andrew@pc01 man ]$ cut -d'.' c -f1
137
```

```bash
[ andrew@pc01 man ]$ echo "old" | sed s/old/new/
new
```

## Comparación de patrones

### `grep`

```bash
[ andrew@pc01 ~ ]$ grep -e ".*fi.*" /etc/profile
# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
    # The file bash.bashrc already sets the default PS1.
    fi
    fi
...
```

```bash
[ andrew@pc01 ~ ]$ grep "andrew" /etc/passwd
andrew:x:1000:1000:andrew,,,:/home/andrew:/bin/bash
```

### `awk`

```bash
[ andrew@pc01 ~ ]$ printf "A 10\nB 20\nC 60" > file
```

```bash
[ andrew@pc01 ~ ]$ awk 'BEGIN {sum=0; count=0; OFS=" "} {sum+=$2; count++} END {print "Average:", sum/count}' file
Average: 30
```

## Copiar archivos a través de ssh

### `ssh / scp`

```bash
[ andrew@pc01 ~ ]$ ssh –p <port> andrew@137.xxx.xxx.89
Last login: Fri Jan 11 12:30:52 2019 from 137.xxx.xxx.199
```

```bash
[ andrew@pc02 ~ ]$ exit
logout
Connection to 137.xxx.xxx.89 closed.
```

```bash
[ andrew@pc01 ~ ]$ echo "hello" > hello
```

```bash
[ andrew@pc01 ~ ]$ scp –P <port> hello andrew@137.xxx.xxx.89:~
hello
```

```bash
[ andrew@pc02 ~ ]$ ssh –p <port> andrew@137.xxx.xxx.89
Last login: Fri Jan 11 22:47:37 2019 from 137.xxx.xxx.79
```

```bash
[ andrew@pc02 ~ ]$ ls
hello  multi  xargs

[ andrew@pc02 ~ ]$ cat hello
hello
```

### `rsync`

```bash
[ andrew@pc01 d ]$ ls && ls ../s
f0
f0  f1
```

```bash
[ andrew@pc01 d ]$ rsync -av ../s/* .
sending incremental file list...
```

```bash
[ andrew@pc01 d ]$ ls
f0  f1
```

```bash
[ andrew@pc02 r ]$ ls

[ andrew@pc02 r ]$ rsync -avz -e "ssh -p <port>" andrew@137.xxx.xxx.79:~/s/* .
receiving incremental file list
f0
f1

sent 62 bytes  received 150 bytes  141.33 bytes/sec
total size is 0  speedup is 0.00

[ andrew@pc02 r ]$ ls
f0  f1
```

## Procesos de larga duración

### `yes / nohup / ps / kill`

```bash
[ andrew@pc01 ~ ]$ nohup yes &
[1] 13173
```

```bash
[ andrew@pc01 ~ ]$ ps | sed -n '/yes/p'
13173 pts/10   00:00:12 yes
```

```bash
[ andrew@pc01 ~ ]$ ps | sed -n '/yes/p'
```

```bash
[ andrew@pc01 ~ ]$ top -bn 1 | sed -n '/yes/p'
13173 andrew    20   0    4372    704    636 D  25.0  0.0   0:35.99 yes
```

```bash
[ andrew@pc01 ~ ]$ kill -9 13173
```

```bash
[ andrew@pc01 ~ ]$ top -bn 1 | sed -n '/yes/p'
```

### `cron / crontab / >>`

```bash
* * * * * date >> ~/datefile.txt
```

```bash
[ andrew@pc02 ~ ]$ head ~/datefile.txt
Sat Jan 12 14:37:01 GMT 2019
Sat Jan 12 14:38:01 GMT 2019
Sat Jan 12 14:39:01 GMT 2019...
```

## Miscellaneous

### `pushd / popd`

```bash
[ andrew@pc01 ~ ]$ pwd
/home/andrew
```

```bash
[ andrew@pc01 ~ ]$ pushd /etc/java/security/security.d/
/etc/java/security/security.d ~
```

```bash
[ andrew@pc01 security.d ]$ pushd ~/test/
~/test /etc/java/security/security.d ~
```

```bash
[ andrew@pc01 test ]$ popd
/etc/java/security/security.d ~

[ andrew@pc01 security.d ]$ pwd
/etc/java/security/security.d
```

```bash
[ andrew@pc01 security.d ]$ popd
~

[ andrew@pc01 ~ ]$ pwd
/home/andrew
```

### `xdg-open`

```bash
[ andrew@pc01 security.d ]$ xdg-open index.html
```

### `xargs`

```bash
[ andrew@pc01 ~ ]$ export lv=".\n..\n../.."

[ andrew@pc01 ~ ]$ printf $lv | xargs ls
.:
multi  file

..:
anaid  andrew  colin...

../..:
bin    dev   index...
```

```bash
[ andrew@pc01 ~ ]$ printf $lv | xargs -I % sh -c 'cd %; pwd %'
/home/andrew
/home
/
```

## Bonus: Cosas divertidas pero inútiles

### `w / write / wall / lynx`

```bash
[ andrew@pc01 ~ ]$ w
 17:32:42 up 434 days,  3:11,  8 users,  load average: 2.32, 2.46, 2.57
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
colin    pts/9    137.xx.xx.210    03Jan19  5:28m  1:12   0.00s sshd: colin [priv]
andrew   pts/10   137.xx.xx.199    11:05    1.00s  0.15s  0.04s sshd: andrew [priv]
colin    pts/12   137.xx.xx.210    03Jan19 34:32   1.59s  1.59s –bash
...
```

```bash
[ andrew@pc01 ~ ]$ echo "hello" | write andrew pts/10

Message from andrew@pc01 on pts/10 at 17:34 ...
hello
EOF
```

### `nautilus / date / cal / bc`

```bash
[ andrew@pc01 ~ ]$ date
Fri Jan 11 17:40:30 GMT 2019
```

```bash
[ andrew@pc01 ~ ]$ cal
    January 2019
Su Mo Tu We Th Fr Sa
       1  2  3  4  5
 6  7  8  9 10 11 12
13 14 15 16 17 18 19
20 21 22 23 24 25 26
27 28 29 30 31
```

```bash
[ andrew@pc01 ~ ]$ bc
bc 1.06.95 ...
20/4
5
```

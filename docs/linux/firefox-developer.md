---
sidebar_position: 2
---

# Firefox Developer Edition

¿Quieres instalar y utilizar Firefox Developer Edition en tu Ubuntu y no sabes cómo hacerlo?
Si tu respuesta es sí, entonces este artículo es para ti. Estoy seguro de que has visto algunas documentaciones por ahí pero en esta vamos a añadir Firefox Developer Edition a nuestro lanzador Unity. De nada 😉

1. Descarga el archivo `.tar` de <a href="https://www.mozilla.org/en-US/firefox/developer/" target="_blank" rel="noopener noreferrer">Mozilla</a>. Ten en cuenta el nombre del archivo `.tar` porque cambia con cada actualización.
2. Abre tu terminal y accede a `Downloads`.
3. Copia el archivo `.tar` en la carpeta `/opt`:
   ```bash
   sudo cp -rp firefox-67.0b10.tar.bz2 /opt
   ```
4. Borra el archivo `.tar`:
   ```bash
   sudo rm -rf firefox-67.0b10.tar.bz2
   ```
5. Accede a la carpeta `/opt`:
   ```bash
   cd /opt
   ```
6. Descomprime el archivo `.tar`:
   ```bash
   sudo tar xjf firefox-67.0b10.tar.bz2
   ```
7. Elimina el `.tar`:
   ```bash
   sudo rm -rf firefox-67.0b10.tar.bz2
   ```
8. Vamos a darle permisos a la carpeta de Firefox:
   ```bash
   sudo chown -R $USER /opt/firefox
   ```
9. Abrimos el archivo de configuración de `bash`:
   ```bash
   nano ~/.bashrc
   ```
10. Copia y pega al final del archivo la siguiente línea:
    ```bash
    export PATH=/opt/firefox/firefox:$PATH
    ```
11. Cierra el archivo con `ctrl+x` y guarda los cambios.
12. El último es ejecutar un comando para crear un acceso directo de Unity. Después de crear este archivo, podremos buscar "Firefox Developer Edition" nuestro Dashboard:

    ```bash

    cat > ~/.local/share/applications/firefoxDeveloperEdition.desktop <<EOL
    [Desktop Entry]
    Encoding=UTF-8
    Name=Firefox Developer Edition
    Exec=/opt/firefox/firefox
    Icon=/opt/firefox/browser/chrome/icons/default/default128.png
    Terminal=false
    Type=Application
    Categories=Network;WebBrowser;Favorite;
    MimeType=text/html;text/xml;application/xhtml_xml;x-scheme-handler/http;x-scheme-handler/https;x-scheme-handler/ftp; X-Ayatana-Desktop-Shortcuts=NewWindow;NewIncognitos;
    EOL


    ```

Si, muchísimos comandos... 😪
El navegador debería aparecer cuando hagamos click en mostrar aplicación en el Dahsboard de Unity. Si quieres ahora puedes añadirlo a favoritos haciendo clic derecho en el Icono del navegador. 👏

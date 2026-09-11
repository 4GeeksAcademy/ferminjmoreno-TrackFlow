# Ejecutar el demo de dominio

Desde la raiz del repositorio, inicia el servidor HTTP estatico:

```bash
npx --yes http-server . -p 8081 -a 0.0.0.0 -c-1
```

Mantiene esa terminal abierta mientras uses el demo.

En VS Code, abre la vista **Puertos**. Si el puerto `8081` no aparece, selecciona **Reenviar un puerto** e introduce `8081`. Abre en Chrome la direccion generada por VS Code y agrega esta ruta al final:

```text
/domain-demo.html
```

La URL tiene esta forma:

```text
https://<identificador-del-codespace>-8081.app.github.dev/domain-demo.html
```

No uses `localhost:8081` en Chrome cuando trabajes desde el contenedor: Chrome necesita la URL reenviada por VS Code. El subdominio puede cambiar entre sesiones.

Para detener el servidor, vuelve a su terminal y presiona `Ctrl+C`.

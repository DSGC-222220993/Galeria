# Galeria Interactiva

Esta es una aplicación Angular sencilla que muestra fotos en un carrusel horizontal. Permite agregar nuevas imágenes por URL, dar likes y eliminar fotos. Los datos se guardan en localStorage, por lo que las fotos agregadas permanecen tras recargar y las eliminadas desaparecen permanentemente.

## Funcionalidades

- Agregar nueva foto por título y URL
- Agregar con Enter o con botón
- Contador de likes y botón para sumar
- Eliminar foto
- Mensaje de error si falta título o URL
- Mensaje de confirmación al agregar
- Persistencia en localStorage para mantener cambios al recargar
- Carrusel navegable con flechas


## Estructura Técnica

- Desarrollada con Angular standalone components
- Uso de FormsModule para binding de formulario y entrada con Enter
- localStorage para persistir fotos, likes y eliminaciones entre recargas
- Carrusel horizontal con navegación por flechas y tarjetas centradas
- Validación de formulario con mensaje de error y confirmación de éxito
- Diseño responsivo con CSS moderno, tarjetas con efecto hover y scroll oculto

##  Cómo Correr en Otro Dispositivo (Primera Vez)

1. Clonar o copiar el proyecto
   cd galeria-interactiva

2. Instalar dependencias
   npm install

3. Iniciar el servidor de desarrollo
   ng serve

4. Abrir en el navegador
    Local: http://localhost:4200/
    Desde otro dispositivo en la red: http://<IP-DE-TU-PC>:4200/

5. Usar la aplicación
    Explora la galeria
    Reacciona a las imagenes
    Agrega una foto nueva

## Notas Importantes
- No hay backend; las fotos se guardan solo en el navegador (localStorage)
- Solo se aceptan URLs de imagen válidas; no hay validación de formato avanzado
- La galería se centra con una imagen cuando queda sola
- La navegación del carrusel es por flechas, no por barra de desplazamiento visible
  
  <img width="1022" height="299" alt="image" src="https://github.com/user-attachments/assets/78f0cc18-b4a8-4985-ba97-17626dafa02d" />
  
  <img width="1135" height="779" alt="image" src="https://github.com/user-attachments/assets/9268034b-c052-4361-9a61-db21f348aa56" />
  
  <img width="1072" height="666" alt="image" src="https://github.com/user-attachments/assets/36351e44-25e9-4366-b9ba-0959b8dff168" />

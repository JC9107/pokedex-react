# Pokédex React

Aplicación web hecha con React para explorar los 151 Pokémon de la primera generación. Es un proyecto de práctica que armé para reforzar mis conocimientos de frontend moderno.

## Funcionalidades

- Lista de Pokémon con imagen, número y nombre, consumida desde la [PokéAPI](https://pokeapi.co/).
- Buscador que filtra mientras se escribe.
- Ventana de detalle con tipos, altura, peso y estadísticas base.
- Favoritos con estado global, y un filtro para ver solo los favoritos.
- Estados de carga y error, y mensaje cuando no hay resultados.
- Diseño responsive: de 2 columnas en celular hasta 6 en pantallas grandes.

## Tecnologías

React, TypeScript, Vite, Tailwind CSS, Redux Toolkit y fetch para consumir la API REST.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Luego abrir `http://localhost:5173`.

## Notas

- Los favoritos se guardan solo en memoria, así que se pierden al recargar la página.

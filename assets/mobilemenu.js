/* Q Bazaar â€” mobile navigation drawer (Figma mobile layout).
   On phones the header's icon cluster is hidden and a hamburger opens a slide-in
   drawer with the full navigation (Home, Categories, Favorites, Messages, Saved
   Search, My Ads, Sales Overview, Account Settings, Wallet, Log Out) plus an
   Add Ads button â€” matching the Figma "Menu" screens. Pure HTML/CSS/JS, links to
   the existing page files. Re-applies after the engine's re-renders. */
(function () {
  var I = {
    home: '<path d="M11 19 C11 19.552 11.448 20 12 20 C12.552 20 13 19.552 13 19 L12 19 L11 19 Z M5 19 C5 19.552 5.448 20 6 20 C6.552 20 7 19.552 7 19 L6 19 L5 19 Z M0 8 L1 8 L1 8 L0 8 Z M0.709 6.472 L1.355 7.236 L1.36 7.232 L0.709 6.472 Z M7.709 0.472 L7.063 -0.291 L7.058 -0.287 L7.709 0.472 Z M9 0 L9 -1 L9 0 Z M10.291 0.472 L10.942 -0.287 L10.937 -0.291 L10.291 0.472 Z M17.291 6.472 L16.64 7.232 L16.646 7.236 L17.291 6.472 Z M18 8 L17 8 L17 8 L18 8 Z M0 17 L-1 17 L0 17 Z M12 19 L13 19 L13 11 L12 11 L11 11 L11 19 L12 19 Z M12 11 L13 11 C13 10.47 12.789 9.961 12.414 9.586 L11.707 10.293 L11 11 L11 11 L12 11 Z M11.707 10.293 L12.414 9.586 C12.039 9.211 11.53 9 11 9 L11 10 L11 11 L11 11 L11.707 10.293 Z M11 10 L11 9 L7 9 L7 10 L7 11 L11 11 L11 10 Z M7 10 L7 9 C6.47 9 5.961 9.211 5.586 9.586 L6.293 10.293 L7 11 L7 11 L7 10 Z M6.293 10.293 L5.586 9.586 C5.211 9.961 5 10.47 5 11 L6 11 L7 11 L7 11 L6.293 10.293 Z M6 11 L5 11 L5 19 L6 19 L7 19 L7 11 L6 11 Z M0 8 L1 8 C1 7.855 1.032 7.711 1.093 7.579 L0.186 7.158 L-0.721 6.737 C-0.905 7.133 -1 7.564 -1 8.001 L0 8 Z M0.186 7.158 L1.093 7.579 C1.154 7.447 1.243 7.33 1.355 7.236 L0.709 6.472 L0.064 5.709 C-0.27 5.99 -0.538 6.341 -0.721 6.737 L0.186 7.158 Z M0.709 6.472 L1.36 7.232 L8.36 1.232 L7.709 0.472 L7.058 -0.287 L0.058 5.713 L0.709 6.472 Z M7.709 0.472 L8.354 1.236 C8.535 1.084 8.764 1 9 1 L9 0 L9 -1 C8.291 -1 7.605 -0.749 7.063 -0.291 L7.709 0.472 Z M9 0 L9 1 C9.236 1 9.465 1.084 9.646 1.236 L10.291 0.472 L10.937 -0.291 C10.395 -0.749 9.709 -1 9 -1 L9 0 Z M10.291 0.472 L9.64 1.232 L16.64 7.232 L17.291 6.472 L17.942 5.713 L10.942 -0.287 L10.291 0.472 Z M17.291 6.472 L16.646 7.236 C16.757 7.33 16.846 7.447 16.907 7.579 L17.814 7.158 L18.721 6.737 C18.538 6.341 18.27 5.99 17.937 5.709 L17.291 6.472 Z M17.814 7.158 L16.907 7.579 C16.968 7.711 17 7.855 17 8 L18 8 L19 8.001 C19 7.564 18.905 7.133 18.721 6.737 L17.814 7.158 Z M18 8 L17 8 L17 17 L18 17 L19 17 L19 8 L18 8 Z M18 17 L17 17 C17 17.266 16.895 17.52 16.707 17.708 L17.414 18.415 L18.121 19.122 C18.684 18.559 19 17.796 19 17 L18 17 Z M17.414 18.415 L16.707 17.708 C16.52 17.895 16.265 18 16 18 L16 19 L16 20 C16.796 20 17.559 19.684 18.121 19.122 L17.414 18.415 Z M16 19 L16 18 L2 18 L2 19 L2 20 L16 20 L16 19 Z M2 19 L2 18 C1.735 18 1.48 17.895 1.293 17.708 L0.586 18.415 L-0.121 19.122 C0.441 19.684 1.204 20 2 20 L2 19 Z M0.586 18.415 L1.293 17.708 C1.105 17.52 1 17.266 1 17 L0 17 L-1 17 C-1 17.796 -0.684 18.559 -0.121 19.122 L0.586 18.415 Z M0 17 L1 17 L1 8 L0 8 L-1 8 L-1 17 L0 17 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(3 1.9991999864578247)"/>',
    grid: '<path d="M6.27 8.49 L6.275 7.74 L6.27 7.74 L6.27 8.49 Z M8.5 6.52 L9.25 6.52 L9.25 1.98 L8.5 1.98 L7.75 1.98 L7.75 6.52 L8.5 6.52 Z M8.5 1.98 L9.25 1.98 C9.25 1.178 9.069 0.425 8.479 -0.099 C7.912 -0.603 7.124 -0.75 6.27 -0.75 L6.27 0 L6.27 0.75 C7.006 0.75 7.333 0.888 7.483 1.022 C7.611 1.135 7.75 1.372 7.75 1.98 L8.5 1.98 Z M6.27 0 L6.27 -0.75 L2.23 -0.75 L2.23 0 L2.23 0.75 L6.27 0.75 L6.27 0 Z M2.23 0 L2.23 -0.75 C1.376 -0.75 0.588 -0.603 0.021 -0.099 C-0.569 0.425 -0.75 1.178 -0.75 1.98 L0 1.98 L0.75 1.98 C0.75 1.372 0.889 1.135 1.017 1.022 C1.167 0.888 1.494 0.75 2.23 0.75 L2.23 0 Z M0 1.98 L-0.75 1.98 L-0.75 6.51 L0 6.51 L0.75 6.51 L0.75 1.98 L0 1.98 Z M0 6.51 L-0.75 6.51 C-0.75 7.315 -0.57 8.071 0.022 8.594 C0.59 9.097 1.379 9.24 2.23 9.24 L2.23 8.49 L2.23 7.74 C1.491 7.74 1.165 7.603 1.016 7.471 C0.89 7.359 0.75 7.125 0.75 6.51 L0 6.51 Z M2.23 8.49 L2.23 9.24 L6.27 9.24 L6.27 8.49 L6.27 7.74 L2.23 7.74 L2.23 8.49 Z M6.27 8.49 L6.265 9.24 C7.119 9.245 7.91 9.103 8.478 8.599 C9.069 8.076 9.25 7.321 9.25 6.52 L8.5 6.52 L7.75 6.52 C7.75 7.129 7.611 7.364 7.484 7.476 C7.335 7.607 7.011 7.745 6.275 7.74 L6.27 8.49 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(13.5 2)"/><path d="M8.5 6.27 L9.25 6.27 L9.25 2.23 L8.5 2.23 L7.75 2.23 L7.75 6.27 L8.5 6.27 Z M8.5 2.23 L9.25 2.23 C9.25 1.36 9.079 0.556 8.512 -0.012 C7.944 -0.579 7.14 -0.75 6.27 -0.75 L6.27 0 L6.27 0.75 C6.99 0.75 7.301 0.899 7.451 1.049 C7.601 1.199 7.75 1.51 7.75 2.23 L8.5 2.23 Z M6.27 0 L6.27 -0.75 L2.23 -0.75 L2.23 0 L2.23 0.75 L6.27 0.75 L6.27 0 Z M2.23 0 L2.23 -0.75 C1.36 -0.75 0.556 -0.579 -0.012 -0.012 C-0.579 0.556 -0.75 1.36 -0.75 2.23 L0 2.23 L0.75 2.23 C0.75 1.51 0.899 1.199 1.049 1.049 C1.199 0.899 1.51 0.75 2.23 0.75 L2.23 0 Z M0 2.23 L-0.75 2.23 L-0.75 6.27 L0 6.27 L0.75 6.27 L0.75 2.23 L0 2.23 Z M0 6.27 L-0.75 6.27 C-0.75 7.14 -0.579 7.944 -0.012 8.512 C0.556 9.079 1.36 9.25 2.23 9.25 L2.23 8.5 L2.23 7.75 C1.51 7.75 1.199 7.601 1.049 7.451 C0.899 7.301 0.75 6.99 0.75 6.27 L0 6.27 Z M2.23 8.5 L2.23 9.25 L6.27 9.25 L6.27 8.5 L6.27 7.75 L2.23 7.75 L2.23 8.5 Z M6.27 8.5 L6.27 9.25 C7.14 9.25 7.944 9.079 8.512 8.512 C9.079 7.944 9.25 7.14 9.25 6.27 L8.5 6.27 L7.75 6.27 C7.75 6.99 7.601 7.301 7.451 7.451 C7.301 7.601 6.99 7.75 6.27 7.75 L6.27 8.5 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(13.5 13.5)"/><path d="M6.27 8.49 L6.275 7.74 L6.27 7.74 L6.27 8.49 Z M8.5 6.52 L9.25 6.52 L9.25 1.98 L8.5 1.98 L7.75 1.98 L7.75 6.52 L8.5 6.52 Z M8.5 1.98 L9.25 1.98 C9.25 1.178 9.069 0.425 8.479 -0.099 C7.912 -0.603 7.124 -0.75 6.27 -0.75 L6.27 0 L6.27 0.75 C7.006 0.75 7.333 0.888 7.483 1.022 C7.611 1.135 7.75 1.372 7.75 1.98 L8.5 1.98 Z M6.27 0 L6.27 -0.75 L2.23 -0.75 L2.23 0 L2.23 0.75 L6.27 0.75 L6.27 0 Z M2.23 0 L2.23 -0.75 C1.376 -0.75 0.588 -0.603 0.021 -0.099 C-0.569 0.425 -0.75 1.178 -0.75 1.98 L0 1.98 L0.75 1.98 C0.75 1.372 0.889 1.135 1.017 1.022 C1.167 0.888 1.494 0.75 2.23 0.75 L2.23 0 Z M0 1.98 L-0.75 1.98 L-0.75 6.51 L0 6.51 L0.75 6.51 L0.75 1.98 L0 1.98 Z M0 6.51 L-0.75 6.51 C-0.75 7.315 -0.57 8.071 0.022 8.594 C0.59 9.097 1.379 9.24 2.23 9.24 L2.23 8.49 L2.23 7.74 C1.491 7.74 1.165 7.603 1.016 7.471 C0.89 7.359 0.75 7.125 0.75 6.51 L0 6.51 Z M2.23 8.49 L2.23 9.24 L6.27 9.24 L6.27 8.49 L6.27 7.74 L2.23 7.74 L2.23 8.49 Z M6.27 8.49 L6.265 9.24 C7.119 9.245 7.91 9.103 8.478 8.599 C9.069 8.076 9.25 7.321 9.25 6.52 L8.5 6.52 L7.75 6.52 C7.75 7.129 7.611 7.364 7.484 7.476 C7.335 7.607 7.011 7.745 6.275 7.74 L6.27 8.49 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2 2)"/><path d="M8.5 6.27 L9.25 6.27 L9.25 2.23 L8.5 2.23 L7.75 2.23 L7.75 6.27 L8.5 6.27 Z M8.5 2.23 L9.25 2.23 C9.25 1.36 9.079 0.556 8.512 -0.012 C7.944 -0.579 7.14 -0.75 6.27 -0.75 L6.27 0 L6.27 0.75 C6.99 0.75 7.301 0.899 7.451 1.049 C7.601 1.199 7.75 1.51 7.75 2.23 L8.5 2.23 Z M6.27 0 L6.27 -0.75 L2.23 -0.75 L2.23 0 L2.23 0.75 L6.27 0.75 L6.27 0 Z M2.23 0 L2.23 -0.75 C1.36 -0.75 0.556 -0.579 -0.012 -0.012 C-0.579 0.556 -0.75 1.36 -0.75 2.23 L0 2.23 L0.75 2.23 C0.75 1.51 0.899 1.199 1.049 1.049 C1.199 0.899 1.51 0.75 2.23 0.75 L2.23 0 Z M0 2.23 L-0.75 2.23 L-0.75 6.27 L0 6.27 L0.75 6.27 L0.75 2.23 L0 2.23 Z M0 6.27 L-0.75 6.27 C-0.75 7.14 -0.579 7.944 -0.012 8.512 C0.556 9.079 1.36 9.25 2.23 9.25 L2.23 8.5 L2.23 7.75 C1.51 7.75 1.199 7.601 1.049 7.451 C0.899 7.301 0.75 6.99 0.75 6.27 L0 6.27 Z M2.23 8.5 L2.23 9.25 L6.27 9.25 L6.27 8.5 L6.27 7.75 L2.23 7.75 L2.23 8.5 Z M6.27 8.5 L6.27 9.25 C7.14 9.25 7.944 9.079 8.512 8.512 C9.079 7.944 9.25 7.14 9.25 6.27 L8.5 6.27 L7.75 6.27 C7.75 6.99 7.601 7.301 7.451 7.451 C7.301 7.601 6.99 7.75 6.27 7.75 L6.27 8.5 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2 13.5)"/>',
    heart: '<path d="M10.62 17.71 L10.378 17 L10.37 17.003 L10.62 17.71 Z M9.38 17.71 L9.63 17.003 L9.622 17 L9.38 17.71 Z M10 2.24 L9.398 2.687 C9.539 2.878 9.763 2.99 10 2.99 C10.237 2.99 10.461 2.878 10.602 2.687 L10 2.24 Z M10.62 17.71 L10.37 17.003 C10.306 17.026 10.171 17.05 10 17.05 C9.829 17.05 9.694 17.026 9.63 17.003 L9.38 17.71 L9.13 18.417 C9.406 18.514 9.721 18.55 10 18.55 C10.279 18.55 10.594 18.514 10.87 18.417 L10.62 17.71 Z M9.38 17.71 L9.622 17 C8.28 16.542 6.037 15.324 4.139 13.38 C2.251 11.445 0.75 8.841 0.75 5.59 L0 5.59 L-0.75 5.59 C-0.75 9.339 0.989 12.3 3.066 14.428 C5.133 16.546 7.58 17.888 9.138 18.42 L9.38 17.71 Z M0 5.59 L0.75 5.59 C0.75 2.911 2.908 0.75 5.56 0.75 L5.56 0 L5.56 -0.75 C2.072 -0.75 -0.75 2.089 -0.75 5.59 L0 5.59 Z M5.56 0 L5.56 0.75 C7.131 0.75 8.523 1.508 9.398 2.687 L10 2.24 L10.602 1.793 C9.457 0.252 7.629 -0.75 5.56 -0.75 L5.56 0 Z M10 2.24 L10.602 2.687 C11.477 1.509 12.878 0.75 14.44 0.75 L14.44 0 L14.44 -0.75 C12.382 -0.75 10.543 0.251 9.398 1.793 L10 2.24 Z M14.44 0 L14.44 0.75 C17.092 0.75 19.25 2.911 19.25 5.59 L20 5.59 L20.75 5.59 C20.75 2.089 17.928 -0.75 14.44 -0.75 L14.44 0 Z M20 5.59 L19.25 5.59 C19.25 8.841 17.749 11.445 15.861 13.38 C13.963 15.324 11.72 16.542 10.378 17 L10.62 17.71 L10.862 18.42 C12.42 17.888 14.867 16.546 16.934 14.428 C19.011 12.3 20.75 9.339 20.75 5.59 L20 5.59 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2 3.0999999046325684)"/>',
    chat: '<path d="M15 17 L15 16.25 L5 16.25 L5 17 L5 17.75 L15 17.75 L15 17 Z M5 17 L5 16.25 C3.615 16.25 2.575 15.904 1.885 15.263 C1.205 14.632 0.75 13.607 0.75 12 L0 12 L-0.75 12 C-0.75 13.893 -0.205 15.368 0.865 16.362 C1.925 17.346 3.385 17.75 5 17.75 L5 17 Z M0 12 L0.75 12 L0.75 5 L0 5 L-0.75 5 L-0.75 12 L0 12 Z M0 5 L0.75 5 C0.75 3.393 1.205 2.368 1.885 1.737 C2.575 1.096 3.615 0.75 5 0.75 L5 0 L5 -0.75 C3.385 -0.75 1.925 -0.346 0.865 0.638 C-0.205 1.632 -0.75 3.107 -0.75 5 L0 5 Z M5 0 L5 0.75 L15 0.75 L15 0 L15 -0.75 L5 -0.75 L5 0 Z M15 0 L15 0.75 C16.385 0.75 17.425 1.096 18.115 1.737 C18.795 2.368 19.25 3.393 19.25 5 L20 5 L20.75 5 C20.75 3.107 20.205 1.632 19.135 0.638 C18.075 -0.346 16.615 -0.75 15 -0.75 L15 0 Z M20 5 L19.25 5 L19.25 12 L20 12 L20.75 12 L20.75 5 L20 5 Z M20 12 L19.25 12 C19.25 13.607 18.795 14.632 18.115 15.263 C17.425 15.904 16.385 16.25 15 16.25 L15 17 L15 17.75 C16.615 17.75 18.075 17.346 19.135 16.362 C20.205 15.368 20.75 13.893 20.75 12 L20 12 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2 3.5)"/><path d="M10.468 0.586 C10.792 0.328 10.845 -0.144 10.586 -0.468 C10.328 -0.792 9.856 -0.845 9.532 -0.586 L10 0 L10.468 0.586 Z M6.87 2.5 L7.337 3.087 L7.338 3.086 L6.87 2.5 Z M3.12 2.5 L2.651 3.085 L2.653 3.087 L3.12 2.5 Z M0.469 -0.585 C0.146 -0.844 -0.326 -0.792 -0.585 -0.469 C-0.844 -0.146 -0.792 0.326 -0.469 0.585 L0 0 L0.469 -0.585 Z M10 0 L9.532 -0.586 L6.402 1.914 L6.87 2.5 L7.338 3.086 L10.468 0.586 L10 0 Z M6.87 2.5 L6.403 1.913 C5.646 2.516 4.344 2.516 3.587 1.913 L3.12 2.5 L2.653 3.087 C3.956 4.124 6.034 4.124 7.337 3.087 L6.87 2.5 Z M3.12 2.5 L3.589 1.915 L0.469 -0.585 L0 0 L-0.469 0.585 L2.651 3.085 L3.12 2.5 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(7 9)"/>',
    search: '<g transform="scale(1.5)"><path d="M12.667 6.333 L11.917 6.333 C11.917 9.417 9.417 11.917 6.333 11.917 L6.333 12.667 L6.333 13.417 C10.245 13.417 13.417 10.245 13.417 6.333 L12.667 6.333 Z M6.333 12.667 L6.333 11.917 C3.25 11.917 0.75 9.417 0.75 6.333 L0 6.333 L-0.75 6.333 C-0.75 10.245 2.421 13.417 6.333 13.417 L6.333 12.667 Z M0 6.333 L0.75 6.333 C0.75 3.25 3.25 0.75 6.333 0.75 L6.333 0 L6.333 -0.75 C2.421 -0.75 -0.75 2.421 -0.75 6.333 L0 6.333 Z M6.333 0 L6.333 0.75 C9.417 0.75 11.917 3.25 11.917 6.333 L12.667 6.333 L13.417 6.333 C13.417 2.421 10.245 -0.75 6.333 -0.75 L6.333 0 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(1.3330078125 1.3333740234375)"/><path d="M0.803 1.864 C1.096 2.157 1.571 2.157 1.864 1.864 C2.157 1.571 2.157 1.096 1.864 0.803 L1.333 1.333 L0.803 1.864 Z M0.53 -0.53 C0.237 -0.823 -0.237 -0.823 -0.53 -0.53 C-0.823 -0.237 -0.823 0.237 -0.53 0.53 L0 0 L0.53 -0.53 Z M1.333 1.333 L1.864 0.803 L0.53 -0.53 L0 0 L-0.53 0.53 L0.803 1.864 L1.333 1.333 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(13.3330078125 13.3333740234375)"/></g>',
    tag: '<g transform="scale(1.6)"><path d="M3.9 1.95 L3.4 1.95 C3.4 2.751 2.751 3.4 1.95 3.4 L1.95 3.9 L1.95 4.4 C3.303 4.4 4.4 3.303 4.4 1.95 L3.9 1.95 Z M1.95 3.9 L1.95 3.4 C1.149 3.4 0.5 2.751 0.5 1.95 L0 1.95 L-0.5 1.95 C-0.5 3.303 0.597 4.4 1.95 4.4 L1.95 3.9 Z M0 1.95 L0.5 1.95 C0.5 1.149 1.149 0.5 1.95 0.5 L1.95 0 L1.95 -0.5 C0.597 -0.5 -0.5 0.597 -0.5 1.95 L0 1.95 Z M1.95 0 L1.95 0.5 C2.751 0.5 3.4 1.149 3.4 1.95 L3.9 1.95 L4.4 1.95 C4.4 0.597 3.303 -0.5 1.95 -0.5 L1.95 0 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(5.550000190734863 4.49375057220459)"/><path d="M0.152 4.056 L-0.336 3.945 L-0.336 3.946 L0.152 4.056 Z M10.627 4.063 L10.139 4.173 L10.139 4.173 L10.627 4.063 Z M7.639 11.588 L7.293 11.227 L7.292 11.228 L7.639 11.588 Z M3.133 11.588 L2.786 11.948 L2.787 11.948 L3.133 11.588 Z M0.152 4.056 L0.639 4.167 C1.194 1.73 3.267 0.499 5.391 0.5 C7.515 0.501 9.588 1.736 10.139 4.173 L10.627 4.063 L11.114 3.952 C10.441 0.976 7.891 -0.498 5.392 -0.5 C2.892 -0.502 0.341 0.97 -0.336 3.945 L0.152 4.056 Z M10.627 4.063 L10.139 4.173 C10.796 7.074 8.999 9.589 7.293 11.227 L7.639 11.588 L7.986 11.948 C9.742 10.261 11.895 7.401 11.114 3.952 L10.627 4.063 Z M7.639 11.588 L7.292 11.228 C6.23 12.253 4.549 12.254 3.479 11.227 L3.133 11.588 L2.787 11.948 C4.242 13.346 6.536 13.347 7.986 11.947 L7.639 11.588 Z M3.133 11.588 L3.48 11.227 C1.78 9.589 -0.018 7.069 0.639 4.167 L0.152 4.056 L-0.336 3.946 C-1.116 7.394 1.036 10.261 2.786 11.948 L3.133 11.588 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2.1107773780822754 1.249998688697815)"/></g>',
    chart: '<circle cx="12" cy="12" r="9"/><path d="m8.5 15.5 7-7M9 9h.01M15 15h.01"/>',
    gear: '<path d="M18.1 6.659 C16.29 6.659 15.55 5.379 16.45 3.809 C16.97 2.899 16.66 1.739 15.75 1.219 L14.02 0.229 C13.23 -0.241 12.21 0.039 11.74 0.829 L11.63 1.019 C10.73 2.589 9.25 2.589 8.34 1.019 L8.23 0.829 C7.78 0.039 6.76 -0.241 5.97 0.229 L4.24 1.219 C3.33 1.739 3.02 2.909 3.54 3.819 C4.45 5.379 3.71 6.659 1.9 6.659 C0.86 6.659 0 7.509 0 8.559 L0 10.319 C0 11.359 0.85 12.219 1.9 12.219 C3.71 12.219 4.45 13.499 3.54 15.069 C3.02 15.979 3.33 17.139 4.24 17.659 L5.97 18.649 C6.76 19.119 7.78 18.839 8.25 18.049 L8.36 17.859 C9.26 16.289 10.74 16.289 11.65 17.859 L11.76 18.049 C12.23 18.839 13.25 19.119 14.04 18.649 L15.77 17.659 C16.68 17.139 16.99 15.969 16.47 15.069 C15.56 13.499 16.3 12.219 18.11 12.219 C19.15 12.219 20.01 11.369 20.01 10.319 L20.01 8.559 C20 7.519 19.15 6.659 18.1 6.659 Z M10 12.689 C8.21 12.689 6.75 11.229 6.75 9.439 C6.75 7.649 8.21 6.189 10 6.189 C11.79 6.189 13.25 7.649 13.25 9.439 C13.25 11.229 11.79 12.689 10 12.689 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2 2.5615234375)"/>',
    wallet: '<g transform="scale(1.0909)"><path d="M14.245 5.317 L14.769 5.853 C14.773 5.849 14.778 5.844 14.782 5.84 L14.245 5.317 Z M13.695 6.811 L14.442 6.749 L14.442 6.74 L13.695 6.811 Z M17.417 8.525 L18.167 8.525 C18.167 8.111 17.831 7.775 17.417 7.775 L17.417 8.525 Z M17.417 4.767 L17.417 5.517 C17.831 5.517 18.167 5.181 18.167 4.767 L17.417 4.767 Z M14.245 5.317 L13.721 4.78 C13.182 5.306 12.871 6.067 12.948 6.882 L13.695 6.811 L14.442 6.74 C14.409 6.4 14.538 6.079 14.769 5.853 L14.245 5.317 Z M13.695 6.811 L12.948 6.873 C13.067 8.308 14.354 9.275 15.675 9.275 L15.675 8.525 L15.675 7.775 C15.016 7.775 14.488 7.294 14.442 6.749 L13.695 6.811 Z M15.675 8.525 L15.675 9.275 L17.417 9.275 L17.417 8.525 L17.417 7.775 L15.675 7.775 L15.675 8.525 Z M17.417 8.525 L16.667 8.525 L16.667 9.616 L17.417 9.616 L18.167 9.616 L18.167 8.525 L17.417 8.525 Z M17.417 9.616 L16.667 9.616 C16.667 11.099 15.453 12.313 13.97 12.313 L13.97 13.063 L13.97 13.813 C16.282 13.813 18.167 11.928 18.167 9.616 L17.417 9.616 Z M13.97 13.063 L13.97 12.313 L3.447 12.313 L3.447 13.063 L3.447 13.813 L13.97 13.813 L13.97 13.063 Z M3.447 13.063 L3.447 12.313 C1.963 12.313 0.75 11.099 0.75 9.616 L0 9.616 L-0.75 9.616 C-0.75 11.928 1.135 13.813 3.447 13.813 L3.447 13.063 Z M0 9.616 L0.75 9.616 L0.75 3.447 L0 3.447 L-0.75 3.447 L-0.75 9.616 L0 9.616 Z M0 3.447 L0.75 3.447 C0.75 1.963 1.963 0.75 3.447 0.75 L3.447 0 L3.447 -0.75 C1.135 -0.75 -0.75 1.135 -0.75 3.447 L0 3.447 Z M3.447 0 L3.447 0.75 L13.97 0.75 L13.97 0 L13.97 -0.75 L3.447 -0.75 L3.447 0 Z M13.97 0 L13.97 0.75 C15.453 0.75 16.667 1.963 16.667 3.447 L17.417 3.447 L18.167 3.447 C18.167 1.135 16.282 -0.75 13.97 -0.75 L13.97 0 Z M17.417 3.447 L16.667 3.447 L16.667 4.767 L17.417 4.767 L18.167 4.767 L18.167 3.447 L17.417 3.447 Z M17.417 4.767 L17.417 4.017 L15.565 4.017 L15.565 4.767 L15.565 5.517 L17.417 5.517 L17.417 4.767 Z M15.565 4.767 L15.565 4.017 C14.851 4.017 14.189 4.299 13.708 4.793 L14.245 5.317 L14.782 5.84 C14.979 5.638 15.253 5.517 15.565 5.517 L15.565 4.767 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2.2916667461395264 7.103642821311951)"/><path d="M-0.75 9.501 C-0.75 9.915 -0.414 10.251 0 10.251 C0.414 10.251 0.75 9.915 0.75 9.501 L0 9.501 L-0.75 9.501 Z M1.687 2.864 L1.422 2.162 L1.421 2.163 L1.687 2.864 Z M8.965 0.114 L9.23 0.816 L9.231 0.815 L8.965 0.114 Z M10.571 5.229 C10.571 5.643 10.907 5.979 11.321 5.979 C11.735 5.979 12.071 5.643 12.071 5.229 L11.321 5.229 L10.571 5.229 Z M0 9.501 L0.75 9.501 L0.75 5.312 L0 5.312 L-0.75 5.312 L-0.75 9.501 L0 9.501 Z M0 5.312 L0.75 5.312 C0.75 4.531 1.228 3.84 1.952 3.566 L1.687 2.864 L1.421 2.163 C0.111 2.658 -0.75 3.91 -0.75 5.312 L0 5.312 Z M1.687 2.864 L1.952 3.566 L9.23 0.816 L8.965 0.114 L8.7 -0.588 L1.422 2.162 L1.687 2.864 Z M8.965 0.114 L9.231 0.815 C9.875 0.571 10.571 1.049 10.571 1.746 L11.321 1.746 L12.071 1.746 C12.071 0.004 10.329 -1.205 8.699 -0.587 L8.965 0.114 Z M11.321 1.746 L10.571 1.746 L10.571 5.229 L11.321 5.229 L12.071 5.229 L12.071 1.746 L11.321 1.746 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(2.2916667461395264 1.8751271963119507)"/><path d="M3.785 3.758 L3.785 4.508 C3.794 4.508 3.803 4.508 3.812 4.508 L3.785 3.758 Z M0.008 2.044 L0.756 1.982 L0.755 1.973 L0.008 2.044 Z M0.558 0.55 L1.082 1.087 C1.087 1.082 1.091 1.078 1.096 1.073 L0.558 0.55 Z M3.785 0 L3.812 -0.75 C3.803 -0.75 3.794 -0.75 3.785 -0.75 L3.785 0 Z M4.702 0.935 L3.952 0.935 L3.952 2.823 L4.702 2.823 L5.452 2.823 L5.452 0.935 L4.702 0.935 Z M4.702 2.823 L3.952 2.823 C3.952 2.913 3.879 3.004 3.758 3.009 L3.785 3.758 L3.812 4.508 C4.718 4.475 5.452 3.742 5.452 2.823 L4.702 2.823 Z M3.785 3.758 L3.785 3.008 L1.988 3.008 L1.988 3.758 L1.988 4.508 L3.785 4.508 L3.785 3.758 Z M1.988 3.758 L1.988 3.008 C1.329 3.008 0.801 2.527 0.756 1.982 L0.008 2.044 L-0.739 2.106 C-0.619 3.541 0.667 4.508 1.988 4.508 L1.988 3.758 Z M0.008 2.044 L0.755 1.973 C0.723 1.633 0.851 1.312 1.082 1.087 L0.558 0.55 L0.034 0.013 C-0.504 0.539 -0.816 1.3 -0.738 2.115 L0.008 2.044 Z M0.558 0.55 L1.096 1.073 C1.293 0.871 1.566 0.75 1.878 0.75 L1.878 0 L1.878 -0.75 C1.164 -0.75 0.502 -0.468 0.021 0.027 L0.558 0.55 Z M1.878 0 L1.878 0.75 L3.785 0.75 L3.785 0 L3.785 -0.75 L1.878 -0.75 L1.878 0 Z M3.785 0 L3.758 0.75 C3.879 0.754 3.952 0.845 3.952 0.935 L4.702 0.935 L5.452 0.935 C5.452 0.017 4.718 -0.717 3.812 -0.75 L3.785 0 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(15.977213859558105 11.871012687683105)"/><path d="M0 -0.75 C-0.414 -0.75 -0.75 -0.414 -0.75 0 C-0.75 0.414 -0.414 0.75 0 0.75 L0 0 L0 -0.75 Z M6.417 0.75 C6.831 0.75 7.167 0.414 7.167 0 C7.167 -0.414 6.831 -0.75 6.417 -0.75 L6.417 0 L6.417 0.75 Z M0 0 L0 0.75 L6.417 0.75 L6.417 0 L6.417 -0.75 L0 -0.75 L0 0 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(6.416666507720947 11)"/></g>',
    out: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'
  };
  I.bell = '<g transform="scale(0.5427)"><path d="M2.72 20.177 L3.576 20.693 L3.579 20.689 L2.72 20.177 Z M0.601 23.696 L-0.256 23.18 L-0.256 23.181 L0.601 23.696 Z M2.591 29.095 L2.27 30.042 L2.274 30.043 L2.591 29.095 Z M27.042 29.095 L26.728 28.146 L26.725 28.147 L27.042 29.095 Z M29.032 23.696 L29.89 23.182 L29.889 23.18 L29.032 23.696 Z M26.913 20.177 L26.047 20.676 L26.052 20.685 L26.057 20.693 L26.913 20.177 Z M14.826 0 L14.826 -1 C8.174 -1 2.77 4.404 2.77 11.056 L3.77 11.056 L4.77 11.056 C4.77 5.509 9.279 1 14.826 1 L14.826 0 Z M3.77 11.056 L2.77 11.056 L2.77 16.381 L3.77 16.381 L4.77 16.381 L4.77 11.056 L3.77 11.056 Z M3.77 16.381 L2.77 16.381 C2.77 16.822 2.672 17.437 2.495 18.074 C2.319 18.71 2.086 19.287 1.861 19.665 L2.72 20.177 L3.579 20.689 C3.925 20.108 4.217 19.35 4.423 18.608 C4.628 17.867 4.77 17.063 4.77 16.381 L3.77 16.381 Z M2.72 20.177 L1.863 19.661 L-0.256 23.18 L0.601 23.696 L1.457 24.212 L3.576 20.693 L2.72 20.177 Z M0.601 23.696 L-0.256 23.181 C-1.052 24.503 -1.208 25.966 -0.731 27.254 C-0.254 28.541 0.816 29.55 2.27 30.042 L2.591 29.095 L2.911 28.148 C1.97 27.829 1.391 27.226 1.145 26.56 C0.898 25.895 0.945 25.064 1.457 24.212 L0.601 23.696 Z M2.591 29.095 L2.274 30.043 C10.421 32.766 19.212 32.766 27.359 30.043 L27.042 29.095 L26.725 28.147 C18.989 30.731 10.644 30.731 2.908 28.147 L2.591 29.095 Z M27.042 29.095 L27.356 30.044 C30.198 29.105 31.434 25.755 29.89 23.182 L29.032 23.696 L28.175 24.211 C29.063 25.691 28.346 27.611 26.728 28.146 L27.042 29.095 Z M29.032 23.696 L29.889 23.18 L27.77 19.661 L26.913 20.177 L26.057 20.693 L28.176 24.212 L29.032 23.696 Z M26.913 20.177 L27.779 19.677 C27.559 19.295 27.329 18.714 27.154 18.077 C26.979 17.438 26.881 16.823 26.881 16.381 L25.881 16.381 L24.881 16.381 C24.881 17.063 25.023 17.867 25.226 18.605 C25.429 19.346 25.715 20.1 26.047 20.676 L26.913 20.177 Z M25.881 16.381 L26.881 16.381 L26.881 11.056 L25.881 11.056 L24.881 11.056 L24.881 16.381 L25.881 16.381 Z M25.881 11.056 L26.881 11.056 C26.881 4.423 21.459 -1 14.826 -1 L14.826 0 L14.826 1 C20.354 1 24.881 5.527 24.881 11.056 L25.881 11.056 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(7.322644233703613 5.362032413482666)"/><path d="M6.818 2.322 L6.539 3.282 C6.905 3.388 7.299 3.277 7.556 2.996 C7.813 2.715 7.888 2.312 7.749 1.957 L6.818 2.322 Z M5.049 1.953 L4.925 2.945 L4.928 2.946 L5.049 1.953 Z M0 2.322 L-0.931 1.957 C-1.07 2.312 -0.995 2.715 -0.738 2.996 C-0.481 3.277 -0.087 3.388 0.279 3.282 L0 2.322 Z M6.818 2.322 L7.097 1.361 C6.482 1.183 5.839 1.042 5.169 0.96 L5.049 1.953 L4.928 2.946 C5.475 3.012 6.011 3.129 6.539 3.282 L6.818 2.322 Z M5.049 1.953 L5.173 0.961 C3.276 0.724 1.444 0.861 -0.279 1.361 L0 2.322 L0.279 3.282 C1.726 2.861 3.283 2.74 4.925 2.945 L5.049 1.953 Z M0 2.322 L0.931 2.687 C1.319 1.695 2.284 1 3.409 1 L3.409 0 L3.409 -1 C1.438 -1 -0.251 0.221 -0.931 1.957 L0 2.322 Z M3.409 0 L3.409 1 C4.534 1 5.498 1.695 5.887 2.687 L6.818 2.322 L7.749 1.957 C7.068 0.221 5.38 -1 3.409 -1 L3.409 0 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(18.739473342895508 3.574688196182251)"/><path d="M11.056 0 L10.056 0 C10.056 2.488 8.016 4.528 5.528 4.528 L5.528 5.528 L5.528 6.528 C9.12 6.528 12.056 3.593 12.056 0 L11.056 0 Z M5.528 5.528 L5.528 4.528 C4.294 4.528 3.144 4.015 2.329 3.199 L1.622 3.906 L0.914 4.613 C2.089 5.788 3.74 6.528 5.528 6.528 L5.528 5.528 Z M1.622 3.906 L2.329 3.199 C1.513 2.384 1 1.234 1 0 L0 0 L-1 0 C-1 1.788 -0.26 3.439 0.914 4.613 L1.622 3.906 Z" fill="currentColor" stroke="none" fill-rule="nonzero" transform="translate(16.620458602905273 35.12038803100586)"/></g>';
  var ITEMS = [
    ['Home', 'index.html', I.home], ['Categories', 'all-categories.html', I.grid],
    ['Favorites', 'wishlist.html', I.heart], ['Messages', 'messages.html', I.chat],
    ['Notifications', 'notifications.html', I.bell],
    ['Saved Search', 'saved-search.html', I.search], ['My Ads', 'my-ads.html', I.tag],
    ['Sales Overview', 'sales-overview.html', I.chart], ['Account Settings', 'account.html', I.gear],
    ['Wallet', 'wallet.html', I.wallet], ['Log Out', 'login.html', I.out]
  ];
  var ORANGE = 'rgb(243,128,87)';

  var CSS = ''
    + '.qb-burger{display:none;position:fixed;top:14px;right:16px;z-index:99990;width:44px;height:44px;'
    +   'border-radius:12px;border:1px solid rgb(237,237,237);background:#fff;align-items:center;justify-content:center;'
    +   'cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06)}'
    + '.qb-burger span{position:relative;width:20px;height:2px;background:#212121;border-radius:2px;transition:.2s}'
    + '.qb-burger span::before,.qb-burger span::after{content:"";position:absolute;left:0;width:20px;height:2px;background:#212121;border-radius:2px;transition:.2s}'
    + '.qb-burger span::before{top:-6px}.qb-burger span::after{top:6px}'
    + '.qb-mbell{display:none;position:fixed;top:14px;right:68px;z-index:99990;width:44px;height:44px;'
    +   'border-radius:12px;border:1px solid rgb(237,237,237);background:#fff;align-items:center;justify-content:center;'
    +   'cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06);text-decoration:none;color:#212121;position:fixed}'
    + '.qb-mbell .dot{position:absolute;top:11px;right:12px;width:7px;height:7px;border-radius:50%;background:' + ORANGE + '}'
    + '.qb-mglobe{display:none;position:fixed;top:14px;right:120px;z-index:99990;width:44px;height:44px;'
    +   'border-radius:12px;border:1px solid rgb(237,237,237);background:#fff;align-items:center;justify-content:center;'
    +   'cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.06);color:#212121}'
    + '.qb-langpop{display:none;position:fixed;top:64px;right:16px;z-index:99993;width:210px;background:#fff;'
    +   'border:1px solid rgb(237,237,237);border-radius:14px;box-shadow:0 16px 40px rgba(0,0,0,.18);padding:8px;font-family:Poppins}'
    + '.qb-langpop.open{display:block}'
    + '.qb-langpop h4{font:600 11px Poppins;letter-spacing:.06em;text-transform:uppercase;color:#999;padding:6px 10px;margin:0}'
    + '.qb-langpop button{display:flex;align-items:center;gap:10px;width:100%;background:none;border:0;padding:9px 10px;'
    +   'border-radius:9px;cursor:pointer;font:500 14px Poppins;color:#333;text-align:left}'
    + '.qb-langpop button:hover{background:rgb(250,250,250)}'
    + '.qb-langpop button.on{background:rgb(255,240,234);color:' + ORANGE + '}'
    + '.qb-langpop .flag{font-size:16px}'
    + '@media (max-width:760px){ .qb-mbell,.qb-mglobe{display:flex} }'
    + '.qb-mdrawer-back{position:fixed;inset:0;background:rgba(20,20,20,.45);z-index:99991;opacity:0;pointer-events:none;transition:opacity .25s}'
    + '.qb-mdrawer{position:fixed;top:0;left:0;bottom:0;z-index:99992;width:86vw;max-width:340px;background:#fff;'
    +   'transform:translateX(-102%);transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;'
    +   'box-shadow:0 0 40px rgba(0,0,0,.2);font-family:Poppins,sans-serif}'
    + '.qb-menu-open .qb-mdrawer{transform:translateX(0)}'
    + '.qb-menu-open .qb-mdrawer-back{opacity:1;pointer-events:auto}'
    + '.qb-mdrawer-top{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid rgb(240,240,240)}'
    + '.qb-mdrawer-top img{height:30px}'
    + '.qb-mdrawer-x{width:34px;height:34px;border-radius:50%;border:1px solid rgb(237,237,237);background:#fff;cursor:pointer;font-size:16px;color:#555;display:flex;align-items:center;justify-content:center}'
    + '.qb-mdrawer-hd{padding:14px 20px 6px;font:600 12px Poppins;letter-spacing:.08em;text-transform:uppercase;color:#aaa}'
    + '.qb-mnav{flex:1;overflow-y:auto;padding:6px 12px 12px}'
    + '.qb-mnav a{display:flex;align-items:center;gap:14px;padding:13px 14px;border-radius:12px;color:#333;'
    +   'text-decoration:none;font:500 15px Poppins;margin-bottom:2px}'
    + '.qb-mnav a .ic{display:flex;flex:0 0 auto}'
    + '.qb-mnav a .lbl{flex:1}'
    + '.qb-mnav a .chev{color:#A19F9F}'
    + '.qb-mnav a:hover{background:rgb(250,250,250)}'
    + '.qb-mnav a.is-active{background:' + ORANGE + ';color:#fff}'
    + '.qb-mnav a.is-active .chev{color:rgba(255,255,255,.8)}'
    + '.qb-mnav a.logout{color:' + ORANGE + '}'
    + '.qb-mdrawer-ft{padding:14px 20px 22px;border-top:1px solid rgb(240,240,240)}'
    + '.qb-mdrawer-ft a{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;'
    +   'border-radius:12px;background:' + ORANGE + ';color:#fff;text-decoration:none;font:600 15px Poppins}'
    + '@media (max-width:760px){ .qb-burger{display:flex} .qb-hcluster{display:none !important} }'
    + '@media (min-width:761px){ .qb-menu-open .qb-mdrawer{transform:translateX(-102%)} .qb-menu-open .qb-mdrawer-back{opacity:0;pointer-events:none} }'
    + '@media (max-width:1000px){'
    +   'footer .qb-fcols{flex-direction:column !important;gap:0 !important;flex-wrap:nowrap !important}'
    +   'footer .qb-facc{flex:1 1 100% !important;width:100% !important;border-bottom:1px solid rgba(0,0,0,.09)}'
    +   'footer .qb-facc:first-of-type{border-top:1px solid rgba(0,0,0,.09)}'
    +   'footer .qb-facc > h3{display:flex !important;align-items:center;justify-content:space-between;cursor:pointer;'
    +     'margin:0 !important;padding:16px 2px !important;font-size:16px !important;font-weight:600 !important}'
    +   'footer .qb-facc > h3::after{content:"";width:8px;height:8px;border-right:2px solid #aaa;'
    +     'border-bottom:2px solid #aaa;transform:rotate(45deg);transition:transform .2s;margin:0 6px 5px 0}'
    +   'footer .qb-facc.qb-open > h3::after{transform:rotate(-135deg);margin:5px 6px 0 0}'
    +   'footer .qb-facc > .qb-flinks{overflow:hidden;max-height:0;transition:max-height .28s ease}'
    +   'footer .qb-facc.qb-open > .qb-flinks{max-height:640px;padding-bottom:14px}'
    /* footer stretches edge-to-edge; the copyright bar centres/stacks instead of
       splitting awkwardly across a narrow row. */
    +   'footer > div{max-width:100% !important;padding-left:20px !important;padding-right:20px !important}'
    +   'footer [style*="border-top: 1px solid rgb(212, 212, 212)"]{flex-direction:column !important;'
    +     'align-items:center !important;text-align:center;gap:12px !important;justify-content:center !important}'
    + '}'
    /* ---- Category listings filter -> slide-up bottom sheet on mobile ----
       The sidebar is styled purely by attribute selector (no class injected into
       the engine-managed DOM). The backdrop + "Show Results" bar live on <body>
       and are created once. `qb-sheet-ready` gates the fixed positioning so the
       filters stay inline (usable) if the script never runs. */
    + '.qb-sheet-back,.qb-sheet-apply{display:none}'
    + '@media (max-width:1000px){'
    +   'body.qb-sheet-ready aside[style*="min-width: 260px"]{position:fixed !important;left:0 !important;right:0 !important;'
    +     'bottom:0 !important;top:auto !important;width:100% !important;max-width:100% !important;min-width:0 !important;'
    +     'margin:0 !important;z-index:99992;max-height:86vh;overflow-y:auto;border-radius:22px 22px 0 0 !important;'
    +     'transform:translateY(106%);transition:transform .34s cubic-bezier(.4,0,.2,1);box-shadow:0 -10px 44px rgba(0,0,0,.22) !important}'
    +   'body.qb-sheet-ready.qb-sheet-open{overflow:hidden}'
    +   'body.qb-sheet-ready.qb-sheet-open aside[style*="min-width: 260px"]{transform:translateY(0);padding-bottom:80px !important}'
    +   '.qb-sheet-back{display:block;position:fixed;inset:0;background:rgba(20,20,20,.45);z-index:99991;opacity:0;'
    +     'pointer-events:none;transition:opacity .25s}'
    +   '.qb-sheet-open .qb-sheet-back{opacity:1;pointer-events:auto}'
    +   '.qb-sheet-apply{display:none;position:fixed;left:0;right:0;bottom:0;z-index:99994;margin:0;padding:16px;border:0;'
    +     'background:' + ORANGE + ';color:#fff;font:600 15px Poppins;cursor:pointer}'
    +   '.qb-sheet-open .qb-sheet-apply{display:block}'
    +   '.qb-filter-btn{display:inline-flex !important;align-items:center;gap:8px;padding:10px 18px !important;'
    +     'border:1px solid rgb(237,237,237) !important;border-radius:10px !important;background:#fff !important;'
    +     'color:rgb(51,51,51) !important;font-weight:600 !important;box-shadow:0 2px 8px rgba(0,0,0,.05);white-space:nowrap}'
    + '}'
    /* ---- Seller pages: Filter / Info become bottom-sheet triggers on
       compact widths (Figma 616:26793: "Filter â‰،" left, "Info â“ک" right,
       cards slide up from the bottom). ---- */
    + '.qb-strig-row{display:none}'
    + '@media (max-width:1000px){'
    +   '.qb-strig-row{display:flex;justify-content:space-between;align-items:center;margin:4px 2px 14px}'
    +   '.qb-strig{display:inline-flex;align-items:center;gap:9px;font:600 17px Poppins;color:#212121;'
    +     'background:none;border:0;cursor:pointer;padding:4px 2px}'
    +   '.qb-cardsheet{position:fixed !important;left:0 !important;right:0 !important;bottom:0 !important;top:auto !important;'
    +     'z-index:99992;max-height:84vh;overflow-y:auto;border-radius:22px 22px 0 0 !important;margin:0 !important;'
    +     'width:100% !important;max-width:100% !important;transform:translateY(106%);'
    +     'transition:transform .34s cubic-bezier(.4,0,.2,1);box-shadow:0 -10px 44px rgba(0,0,0,.22) !important;padding-bottom:26px !important}'
    +   '.qb-cardsheet.qb-open-sheet{transform:translateY(0)}'
    + '}'
    + '.qb-cback{position:fixed;inset:0;background:rgba(20,20,20,.45);z-index:99991;opacity:0;pointer-events:none;transition:opacity .25s}'
    + '.qb-cback.on{opacity:1;pointer-events:auto}'
    /* ---- Messages: two-step list -> chat navigation at compact widths ----
       (Figma tablet/mobile show the inbox alone; the conversation is its own
       screen with a back affordance.) */
    + '.qb-chat-back{display:none}'
    + '@media (max-width:1000px){'
    +   '.qb-mlist{flex:1 1 100% !important;min-width:0 !important;border-right:none !important}'
    +   '.qb-mchat{display:none !important}'
    +   'body.qb-chat-open .qb-mlist{display:none !important}'
    +   'body.qb-chat-open .qb-mchat{display:flex !important;flex:1 1 100% !important;min-width:0 !important}'
    +   'body.qb-chat-open .qb-chat-back{display:inline-flex;align-items:center;gap:8px;margin:14px 16px 0;'
    +     'padding:8px 14px;border:1px solid rgb(237,237,237);border-radius:10px;background:#fff;'
    +     'font:600 13px Poppins;color:rgb(51,51,51);cursor:pointer;align-self:flex-start}'
    + '}';
  var st = document.createElement('style'); st.textContent = CSS;
  (document.head || document.documentElement).appendChild(st);

  /* expose the current screen to CSS so responsive.css can scope per-page rules */
  document.documentElement.setAttribute('data-screen', (window.__QB_SCREEN || 'home'));

  var LOGO = ''; // captured from the page header once available
  function currentFile() { var f = location.pathname.split('/').pop(); return f || 'index.html'; }

  function setOpen(open) {
    window.__qbMenuOpen = open;
    document.documentElement.classList.toggle('qb-menu-open', open);
  }

  function build() {
    if (document.getElementById('qb-burger')) return;
    var burger = document.createElement('button');
    burger.id = 'qb-burger'; burger.className = 'qb-burger'; burger.setAttribute('aria-label', 'Menu');
    burger.innerHTML = '<span></span>';
    burger.addEventListener('click', function () { setOpen(true); });

    var bell = document.createElement('a');
    bell.id = 'qb-mbell'; bell.className = 'qb-mbell'; bell.href = 'notifications.html'; bell.setAttribute('aria-label', 'Notifications');
    bell.innerHTML = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' + I.bell + '</svg><span class="dot"></span>';

    // globe -> language picker (matches Figma mobile header)
    var LANGS = [['English', 'ًں‡¬ًں‡§'], ['Arabic', 'ًں‡¸ًں‡¦'], ['India', 'ًں‡®ًں‡³'], ['Urdu', 'ًں‡µًں‡°'], ['Bengali', 'ًں‡§ًں‡©'], ['Tagalog', 'ًں‡µًں‡­'], ['Persian (Farsi)', 'ًں‡®ًں‡·'], ['Tamil', 'ًں‡®ًں‡³']];
    var globe = document.createElement('button');
    globe.id = 'qb-mglobe'; globe.className = 'qb-mglobe'; globe.setAttribute('aria-label', 'Language');
    globe.innerHTML = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>';
    var pop = document.createElement('div'); pop.className = 'qb-langpop';
    pop.innerHTML = '<h4>Choose your language</h4>' + LANGS.map(function (l, i) {
      return '<button data-lang="' + l[0] + '"' + (i === 0 ? ' class="on"' : '') + '><span class="flag">' + l[1] + '</span>' + l[0] + '</button>';
    }).join('');
    globe.addEventListener('click', function (e) { e.stopPropagation(); pop.classList.toggle('open'); });
    pop.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]'); if (!b) return;
      pop.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on'); pop.classList.remove('open');
    });
    document.addEventListener('click', function () { pop.classList.remove('open'); });

    var back = document.createElement('div'); back.className = 'qb-mdrawer-back';
    back.addEventListener('click', function () { setOpen(false); });

    var cur = currentFile();
    var links = ITEMS.map(function (it) {
      var active = it[1] === cur ? ' is-active' : '';
      var lo = it[0] === 'Log Out' ? ' logout' : '';
      return '<a class="' + (active || lo) + '" href="' + it[1] + '">'
        + '<span class="ic"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">' + it[2] + '</svg></span>'
        + '<span class="lbl">' + it[0] + '</span><span class="chev">&rsaquo;</span></a>';
    }).join('');

    var drawer = document.createElement('nav'); drawer.className = 'qb-mdrawer';
    drawer.innerHTML =
      '<div class="qb-mdrawer-top">' + (LOGO || '<strong style="font:700 18px Poppins">Q BAZAAR</strong>')
      + '<button class="qb-mdrawer-x" aria-label="Close">&times;</button></div>'
      + '<div class="qb-mdrawer-hd">Menu</div>'
      + '<div class="qb-mnav">' + links + '</div>'
      + '<div class="qb-mdrawer-ft"><a href="add-ads.html">ï¼‹ Add Ads</a></div>';
    drawer.querySelector('.qb-mdrawer-x').addEventListener('click', function () { setOpen(false); });

    document.body.appendChild(back);
    document.body.appendChild(drawer);
    document.body.appendChild(pop);
    document.body.appendChild(globe);
    document.body.appendChild(bell);
    document.body.appendChild(burger);
    if (window.__qbMenuOpen) setOpen(true);
  }

  function tagCluster() {
    var header = document.querySelector('header');
    if (!header) return;
    if (!LOGO) { var img = header.querySelector('img'); if (img) LOGO = '<img src="' + img.getAttribute('src') + '" alt="Q Bazaar">'; }
    // the icon/button cluster = header inner row's 2nd child (Add Ads + nav icons)
    var inner = header.children[0];
    if (inner && inner.children[1]) inner.children[1].classList.add('qb-hcluster');
  }

  // Turn the footer's link columns into tap-to-expand accordions on mobile.
  function footerAcc() {
    var footer = document.querySelector('footer');
    if (!footer) return;
    var heads = footer.querySelectorAll('h3');
    for (var i = 0; i < heads.length; i++) {
      var h = heads[i];
      if (h.__facc) continue;
      var links = h.nextElementSibling;
      var col = h.parentElement;
      if (!links || links.tagName !== 'DIV' || !col) continue;
      h.__facc = true;
      col.classList.add('qb-facc');
      if (col.parentElement) col.parentElement.classList.add('qb-fcols');
      links.classList.add('qb-flinks');
      (function (col) {
        h.addEventListener('click', function () {
          if (window.matchMedia('(max-width: 1000px)').matches) col.classList.toggle('qb-open');
        });
      })(col);
    }
  }

  var FUNNEL = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="flex:0 0 auto"><path d="M3 5h18l-7 8v5l-4 2v-7z"/></svg>';

  function openSheet() { document.body.classList.add('qb-sheet-open'); }
  function closeSheet() { document.body.classList.remove('qb-sheet-open'); }
  function isPhone() { return window.matchMedia('(max-width: 1000px)').matches; }

  // One-time wiring for the mobile filter sheet. Deliberately touches ONLY <body>
  // (never the engine-managed sidebar), so it can't fight the engine's re-renders
  // and trigger an observe -> re-render -> observe freeze. The sidebar itself is
  // turned into a sheet purely by CSS attribute selector.
  var sheetReady = false;
  function setupSheet() {
    if (sheetReady) return;
    sheetReady = true;
    var back = document.createElement('div');
    back.className = 'qb-sheet-back';
    back.addEventListener('click', closeSheet);
    var apply2 = document.createElement('button');
    apply2.type = 'button'; apply2.className = 'qb-sheet-apply'; apply2.textContent = 'Show Results';
    apply2.addEventListener('click', closeSheet);
    document.body.appendChild(back);
    document.body.appendChild(apply2);
    // Open when the (otherwise inert) "Filter" button is tapped â€” via delegation,
    // so no per-element wiring and nothing to re-attach after a re-render.
    document.addEventListener('click', function (e) {
      if (!isPhone()) return;
      var el = e.target;
      for (var i = 0; i < 3 && el; i++) {
        if (el.nodeType === 1) {
          if (el.classList && el.classList.contains('qb-filter-btn')) { openSheet(); return; }
          if (el.children.length === 0 && (el.textContent || '').trim() === 'Filter') {
            var p = el.parentElement;
            if (p && /space-between/.test(p.getAttribute('style') || '')) { openSheet(); return; }
          }
        }
        el = el.parentElement;
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSheet(); });
    document.body.classList.add('qb-sheet-ready');
    // Messages: tapping a conversation in the inbox opens the chat pane
    document.addEventListener('click', function (e) {
      if (!isPhone()) return;
      var list = e.target.closest && e.target.closest('.qb-mlist');
      if (!list || e.target.tagName === 'INPUT') return;
      document.body.classList.add('qb-chat-open');
    });
  }

  // Cosmetic only: give the "Filter" button a pill + funnel icon on phones.
  // Runs on a few timers (never inside the observer), so it can't loop.
  function markFilterBtn() {
    if (!isPhone()) return;
    var spans = document.querySelectorAll('span, button');
    for (var i = 0; i < spans.length; i++) {
      var n = spans[i];
      if (n.children.length === 0 && (n.textContent || '').trim() === 'Filter') {
        var p = n.parentElement;
        if (p && /space-between/.test(p.getAttribute('style') || '')) {
          if (!n.classList.contains('qb-filter-btn')) { n.classList.add('qb-filter-btn'); n.innerHTML = FUNNEL + '<span>Filter</span>'; }
          return;
        }
      }
    }
  }

  // Listing pages: at compact widths the sidebar is a bottom sheet, so the
  // toolbar needs a real "Filter" trigger (design 539:35503 shows the pill).
  function ensureFilterTrigger() {
    var ex = document.querySelector('.qb-filter-inject');
    if (!isPhone()) { if (ex && ex.parentNode) ex.parentNode.removeChild(ex); return; }
    if (ex) return;
    var aside = document.querySelector('aside[style*="min-width: 260px"]');
    if (!aside) return;
    var leaves = document.querySelectorAll('div, span, button');
    for (var i = 0; i < leaves.length; i++) {
      var n = leaves[i];
      if (n.children.length <= 1 && /^Newest\b/.test((n.textContent || '').trim())) {
        var row = n.parentElement;
        if (!row) return;
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'qb-filter-btn qb-filter-inject';
        b.innerHTML = FUNNEL + '<span>Filter</span>';
        row.insertBefore(b, row.firstChild);
        return;
      }
    }
  }

  // Messages page: tag the inbox / conversation panes so the compact-width
  // CSS can swap between them (two-step navigation like the Figma frames).
  function tagMessages() {
    if ((window.__QB_SCREEN || '') !== 'messages') return;
    var inp = document.querySelector('input[placeholder*="Type your message"]');
    if (!inp) return;
    var chat = inp;
    while (chat && chat.parentElement) {
      var sib = null, par = chat.parentElement;
      for (var i = 0; i < par.children.length; i++) {
        var c = par.children[i];
        if (c !== chat && /border-right/.test(c.getAttribute('style') || '')) sib = c;
      }
      if (sib) {
        if (!chat.classList.contains('qb-mchat')) {
          chat.classList.add('qb-mchat');
          sib.classList.add('qb-mlist');
          var back = document.createElement('button');
          back.type = 'button'; back.className = 'qb-chat-back';
          back.innerHTML = '&#8249;&nbsp; Messages';
          back.addEventListener('click', function () { document.body.classList.remove('qb-chat-open'); });
          chat.insertBefore(back, chat.firstChild);
        }
        return;
      }
      chat = par;
    }
  }

  // Logged-out header (Figma 741:38067 "Home Page - Before Log/Sign"):
  // until the auth flow is completed (localStorage.qbAuth), the avatar is
  // replaced by Login / Sign Up buttons that open the auth pages.
  function guestHeader() {
    var authed = localStorage.getItem('qbAuth') === '1';
    var fa = null;
    var els = document.querySelectorAll('.qb-hcluster *');
    for (var i = 0; i < els.length; i++) {
      if (els[i].childElementCount === 0 && (els[i].textContent || '').trim() === 'FA') { fa = els[i]; break; }
    }
    if (!fa) return;
    var avatar = fa.parentElement;
    var host = avatar.parentElement;
    var btns = host.querySelector('.qb-guest-btns');
    if (authed) {
      avatar.style.display = '';
      if (btns) btns.remove();
      return;
    }
    avatar.style.display = 'none';
    if (btns) return;
    btns = document.createElement('span');
    btns.className = 'qb-guest-btns';
    btns.setAttribute('style', 'display:inline-flex;gap:10px;align-items:center;margin-left:4px');
    btns.innerHTML = ''
      + '<a href="login.html" style="font:600 14px Poppins;color:rgb(51,51,51);text-decoration:none;'
      +   'padding:10px 18px;border:1px solid rgb(237,237,237);border-radius:10px;background:#fff">Login</a>'
      + '<a href="signup.html" style="font:600 14px Poppins;color:#fff;text-decoration:none;'
      +   'padding:10px 18px;border-radius:10px;background:rgb(243,128,87)">Sign Up</a>';
    host.insertBefore(btns, avatar);
  }
  // completing the last auth step signs in; Log Out signs out
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href="login.html"]');
    if (a && /Log Out/.test(a.textContent || '')) localStorage.removeItem('qbAuth');
  }, true);

  // Seller pages hero (Figma 145:1063 / 136:1562): photo cover banner,
  // circular avatar overlapping it, and the Ads/Followers/Today stats row.
  function sellerHero() {
    if (!/^seller(Ind|Org)?$/.test(window.__QB_SCREEN || '')) return;
    if (document.querySelector('.qb-scover')) return;
    // profile bar = element containing the Follow button and the seller name
    var follow = [].find.call(document.querySelectorAll('*'), function (e) {
      return e.childElementCount <= 1 && /^Follow$/.test((e.textContent || '').trim());
    });
    if (!follow) return;
    var bar = follow.parentElement;
    while (bar && !/rgb\(255,\s*255,\s*255\)/.test(bar.getAttribute('style') || '')) bar = bar.parentElement;
    if (!bar) return;
    var name = (bar.textContent || '').trim().split(/\s/)[0] || 'BT';
    var caps = name.match(/[A-Z]/g) || [];
    var initials = (caps.length >= 2 ? caps.slice(0, 2).join('') : name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()) || 'BT';
    // reuse one of the page's own card photos for the cover
    var cover = '';
    var ph = [].find.call(document.querySelectorAll('.qb-ph'), function (e) {
      return /url\(/.test((e.getAttribute('style') || '') + getComputedStyle(e).backgroundImage);
    });
    if (ph) { var m = /url\(["']?([^"')]+)/.exec(getComputedStyle(ph).backgroundImage); if (m) cover = m[1]; }
    var cv = document.createElement('div');
    cv.className = 'qb-scover';
    cv.setAttribute('style', 'height:190px;border-radius:16px 16px 0 0;margin:0;'
      + (cover ? 'background:url(' + JSON.stringify(cover) + ') center/cover no-repeat;' : 'background:linear-gradient(100deg,rgb(255,240,234),rgb(250,224,212));'));
    bar.parentElement.insertBefore(cv, bar);
    bar.parentElement.style.marginTop = '-170px'; // swallow the engine's empty gray band
    // avatar + stats inside the bar
    var av = document.createElement('div');
    av.className = 'qb-savatar';
    av.setAttribute('style', 'width:96px;height:96px;border-radius:50%;background:#fff;border:4px solid #fff;'
      + 'box-shadow:0 4px 25px rgba(188,188,188,.3);display:flex;align-items:center;justify-content:center;'
      + 'font:600 26px Poppins;color:rgb(120,120,120);margin-top:-64px;flex:0 0 auto');
    av.textContent = initials;
    bar.insertBefore(av, bar.firstChild);
    bar.style.alignItems = 'center';
    bar.style.gap = '18px';
    var nameEl = [].find.call(bar.querySelectorAll('*'), function (e) {
      return e.childElementCount <= 1 && (e.textContent || '').trim() === name;
    });
    var host = nameEl ? nameEl.parentElement : null;
    if (host && !bar.querySelector('.qb-sstats')) {
      var stats = document.createElement('div');
      stats.className = 'qb-sstats';
      stats.setAttribute('style', 'font:400 15px Poppins;color:rgb(161,159,159);margin-top:5px');
      stats.innerHTML = '8,429 <span style="color:#bdbdbd">Ads</span> &nbsp;â€¢&nbsp; 7,429 Followers &nbsp;â€¢&nbsp; <span style="color:rgb(61,190,100);font-weight:500">+2K Today</span>';
      host.parentElement.insertBefore(stats, host.nextSibling);
    }
  }

  // Home hero "Find Places Around Your Location": the design sets the word
  // "Location" in Story Script 64px orange (rest Poppins SemiBold 56).
  function locationWord() {
    var els = document.querySelectorAll('span, div, i, em, b');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.dataset.qbStory || e.childElementCount !== 0) continue;
      if ((e.textContent || '').trim() !== 'Location') continue;
      var fs = parseFloat(getComputedStyle(e).fontSize);
      if (fs < 36) continue; // only the big hero word
      e.dataset.qbStory = '1';
      e.style.fontFamily = "'Story Script', cursive";
      e.style.fontSize = '64px';
      e.style.fontStyle = 'normal';
      e.style.fontWeight = '400';
      e.style.color = 'rgb(243,128,87)';
    }
  }

  // Chat "..." menu: the engine uses emoji glyphs; the design uses vuesax
  // line icons. Swap them (stroke:currentColor keeps Block User red).
  var CHATICONS = {
    'View Ad': '<circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/>',
    'Report User': '<path d="M5 21V4"/><path d="M5 4c4-2.5 8 2.5 14 .5V15c-6 2-10-3-14-.5"/>',
    'Delete Conversation': '<path d="M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14"/><path d="M10 10v6M14 10v6"/>',
    'Block User': '<circle cx="12" cy="12" r="9"/><path d="M5.7 5.7l12.6 12.6"/>'
  };
  function chatMenuIcons() {
    if ((window.__QB_SCREEN || '') !== 'messages') return;
    var els = document.querySelectorAll('div, span, button, a');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.children.length !== 0 || e.dataset.qbCmi) continue; // text leaves only
      if (e.closest && e.closest('[data-qb-cmi]')) continue;    // never re-swap our own span
      var t = (e.textContent || '').trim();
      if (t.length < 6 || t.length > 26) continue;
      var m = /(View Ad|Report User|Delete Conversation|Block User)$/.exec(t);
      if (!m) continue;
      if (t === m[1]) continue; // already emoji-free (our span or clean label)
      e.dataset.qbCmi = '1';
      var label = m[1];
      e.textContent = '';
      e.style.display = 'flex'; e.style.alignItems = 'center'; e.style.gap = '10px';
      e.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="flex:0 0 auto">'
        + CHATICONS[label] + '</svg><span>' + label + '</span>';
    }
  }

  // Seller pages: tag the Advanced Filters / Info cards as bottom sheets and
  // inject the "Filter â‰، / Info â“ک" trigger row under the tabs (Figma 616:26793)
  function cardOf(leafText, minFs) {
    var els = document.querySelectorAll('div, h2, h3, span');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.childElementCount !== 0 || (e.textContent || '').trim() !== leafText) continue;
      if (minFs && parseFloat(getComputedStyle(e).fontSize) < minFs) continue;
      var card = e;
      while (card && !/rgb\(255,\s*255,\s*255\)/.test(card.getAttribute('style') || '')) card = card.parentElement;
      return card;
    }
    return null;
  }
  function sellerCompact() {
    if (!/^seller(Ind|Org)?$/.test(window.__QB_SCREEN || '')) return;
    var filters = cardOf('Advanced Filters');
    var info = cardOf('Info', 17);
    if (filters && !filters.classList.contains('qb-cardsheet')) filters.classList.add('qb-cardsheet');
    if (info && !info.classList.contains('qb-cardsheet')) info.classList.add('qb-cardsheet');
    if (document.querySelector('.qb-strig-row')) return;
    // tabs row = container of the "About us" tab
    var about = [].find.call(document.querySelectorAll('*'), function (e) {
      return e.childElementCount === 0 && (e.textContent || '').trim() === 'About us';
    });
    if (!about) return;
    var tabs = about.parentElement;
    while (tabs && !/Legal Info/.test(tabs.textContent || '')) tabs = tabs.parentElement;
    if (!tabs || !tabs.parentElement) return;
    var row = document.createElement('div');
    row.className = 'qb-strig-row';
    row.innerHTML = ''
      + '<button type="button" class="qb-strig" data-sheet="filters">Filter ' + FUNNEL + '</button>'
      + '<button type="button" class="qb-strig" data-sheet="info">Info '
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 11v5M12 8h.01"/></svg></button>';
    tabs.parentElement.insertBefore(row, tabs.nextSibling);
  }
  function closeCardSheet() {
    document.querySelectorAll('.qb-cardsheet.qb-open-sheet').forEach(function (c) { c.classList.remove('qb-open-sheet'); });
    var bk = document.querySelector('.qb-cback');
    if (bk) bk.classList.remove('on');
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('.qb-strig');
    if (!t) return;
    var card = t.dataset.sheet === 'filters' ? cardOf('Advanced Filters') : cardOf('Info', 17);
    if (!card) return;
    var bk = document.querySelector('.qb-cback');
    if (!bk) {
      bk = document.createElement('div');
      bk.className = 'qb-cback';
      bk.addEventListener('click', closeCardSheet);
      document.body.appendChild(bk);
    }
    card.classList.add('qb-cardsheet', 'qb-open-sheet');
    bk.classList.add('on');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCardSheet(); });

  // Parent-category: tag the small "Categories" grid (sits above View More)
  // so phone CSS can keep it a 2-col grid while product rows become sliders
  function tagCatGrid() {
    if ((window.__QB_SCREEN || '') !== 'catParent') return;
    if (document.querySelector('.qb-catgrid')) return;
    var vm = [].find.call(document.querySelectorAll('*'), function (e) {
      return e.childElementCount <= 1 && /^(View More|Show All)$/.test((e.textContent || '').trim());
    });
    if (!vm) return;
    var sec = vm.parentElement;
    for (var i = 0; i < 5 && sec; i++) {
      var grid = sec.querySelector('[style*="minmax(220px, 1fr)"]');
      if (grid) { grid.classList.add('qb-catgrid'); return; }
      sec = sec.parentElement;
    }
  }

  // Residual emoji glyphs -> design-style line icons (gallery counter camera,
  // location pins, standalone checkmarks). Leaf-swap with loop guards.
  var EMOJI_SVG = {
    '🖻': '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="display:inline-block;vertical-align:-2px"><rect x="3" y="6.5" width="18" height="13" rx="3"/><circle cx="12" cy="13" r="3.6"/><path d="M8.5 6.5 10 4h4l1.5 2.5"/></svg>',
    '📍': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="display:inline-block;vertical-align:-1px"><path d="M20 10c0 6-8 11-8 11s-8-5-8-11a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    '✓': '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-1px"><path d="m4.5 12.5 5 5 10-11"/></svg>'
  };
  function emojiSwap() {
    var els = document.querySelectorAll('div, span, b, strong, p, a, li, small, h1, h2, h3, h4');
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e.children.length !== 0 || e.dataset.qbEsw) continue;
      if (e.closest && e.closest('[data-qb-esw]')) continue;
      var t = e.textContent || '';
      if (t.length > 90) continue;
      var hit = null;
      for (var k in EMOJI_SVG) if (t.indexOf(k) !== -1) { hit = k; break; }
      if (!hit) continue;
      e.dataset.qbEsw = '1';
      var rest = t.split(hit).join('').replace(/️/g, '').trim();
      e.textContent = '';
      e.innerHTML = EMOJI_SVG[hit] + (rest ? '<span> ' + rest.replace(/</g, '&lt;') + '</span>' : '');
    }
  }

  function apply() { tagCluster(); build(); footerAcc(); ensureFilterTrigger(); tagMessages(); guestHeader(); sellerHero(); locationWord(); chatMenuIcons(); sellerCompact(); tagCatGrid(); emojiSwap(); }

  function start() {
    apply();
    setupSheet();
    new MutationObserver(function () { apply(); }).observe(document.body, { childList: true, subtree: true });
    [200, 600, 1200].forEach(function (t) { setTimeout(apply, t); });
    [350, 1000, 2000].forEach(function (t) { setTimeout(markFilterBtn, t); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();


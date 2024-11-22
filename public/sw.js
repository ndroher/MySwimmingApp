import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { NetworkFirst, NetworkOnly } from "workbox-strategies";
import { BackgroundSyncPlugin } from "workbox-background-sync";

const API_BASE_URL = "http://myswimmingapp.local/json";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting();

// cache API
// GET USER
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/user`,
  new NetworkFirst({
    cacheName: "api/user-get",
  })
);

// GET USERS
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/users`,
  new NetworkFirst({
    cacheName: "api/users-get",
  })
);

// GET USER PROFILE
registerRoute(
  ({ url }) => url.pathname.match(/\/api\/user\/.+/),
  new NetworkFirst({
    cacheName: "api/user-profile-get",
  })
);

// GET EXERCICIOS
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/exercicios`,
  new NetworkFirst({
    cacheName: "api/exercicios-get",
  })
);

// GET EXERCICIO
registerRoute(
  ({ url }) => url.pathname.match(/\/api\/exercicio\/\d+/),
  new NetworkFirst({
    cacheName: "api/exercicio-get",
  })
);

// cache navigations
const navigationRoute = new NavigationRoute(
  new NetworkFirst({
    cacheName: "navigation",
    networkTimeoutSeconds: 3,
  })
);
registerRoute(navigationRoute);

// background sync
const bgSyncPlugin = new BackgroundSyncPlugin("backgroundSyncQueue", {
  maxRetentionTime: 24 * 60,
});

// CRIAR EXERCICIO
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/exercicio`,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

// EDITAR EXERCICIO
registerRoute(
  ({ url }) => url.pathname.match(/\/api\/exercicio\/\d+/),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PUT"
);

// DELETAR EXERCICIO
registerRoute(
  ({ url }) => url.pathname.match(/\/api\/exercicio\/\d+/),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "DELETE"
);

// CRIAR TREINO
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/treino`,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

// EDITAR TREINO
registerRoute(
  ({ url }) => url.pathname.match(/\/api\/treino\/\d+/),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PUT"
);

// DELETAR TREINO
registerRoute(
  ({ url }) => url.pathname.match(/\/api\/treino\/\d+/),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "DELETE"
);

// ALTERAR NOME DE EXIBIÇÃO
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/users/me`,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PUT"
);

// ALTERAR FOTO DE PERFIL
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/conta/foto`,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);

// ALTERAR METAS
registerRoute(
  ({ url }) => url.href === `${API_BASE_URL}/api/user/goals`,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "PUT"
);

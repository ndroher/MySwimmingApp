import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";

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

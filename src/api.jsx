export const API_URL = "http://myswimmingapp.local/json";

export function TOKEN_POST(body) {
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_GET(token) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function DISPLAY_NAME_PUT(body, token) {
  return {
    url: API_URL + "/api/users/me",
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_LOST(body) {
  return {
    url: API_URL + "/api/password/lost",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body) {
  return {
    url: API_URL + "/api/password/reset",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_PROFILE_GET(username) {
  return {
    url: API_URL + `/api/user/${username}`,
    options: {
      method: "GET",
    },
  };
}

export function EXERCICIOS_GET(token) {
  return {
    url: API_URL + "/api/exercicios",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function EXERCICIO_POST(body, token) {
  return {
    url: API_URL + "/api/exercicio",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function EXERCICIO_GET(token, id) {
  return {
    url: API_URL + `/api/exercicio/${id}`,
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function EXERCICIO_PUT(body, token, id) {
  return {
    url: API_URL + `/api/exercicio/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function EXERCICIO_DELETE(token, id) {
  return {
    url: API_URL + `/api/exercicio/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  };
}

export function CHANGE_PROFILE_PICTURE_POST(formData, token) {
  return {
    url: API_URL + "/api/conta/foto",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    },
  };
}

export function USER_GOALS_PUT(body, token) {
  return {
    url: API_URL + "/api/user/goals",
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function USER_HISTORICO_GET(username) {
  return {
    url: API_URL + `/api/user/${username}/historico`,
    options: {
      method: "GET",
    },
  };
}

export function TREINO_POST(body, token) {
  return {
    url: API_URL + "/api/treino",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

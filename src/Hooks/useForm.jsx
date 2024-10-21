import React from "react";

const types = {
  username: {
    regex: /^[a-zA-Z0-9]([_-]|[a-zA-Z0-9]){1,18}[a-zA-Z0-9]$/,
    message:
      "O nome de usuário deve ter entre 5 e 20 caracteres, incluindo letras, números, sublinhados (_) e hífens (-), e deve começar e terminar com uma letra ou número.",
  },
  email: {
    regex:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    message: "Preencha um e-mail válido",
  },
  password: {
    regex: /^.{5,}$/,
    message: "A senha precisa ter no mínimo 5 caracteres",
  },
  display_name: {
    regex:
      /^(?=.{1,24}$)([A-Za-zÀ-ÿ]+((\s)?((\'|\-|\.)?([A-Za-zÀ-ÿ])+))*)([A-Za-zÀ-ÿ])?$/,
    message:
      "O nome de exibição deve ter entre 1 e 24 caracteres e deve começar e terminar com uma letra. Números não são permitidos.",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize somente números.",
  },
};

const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;

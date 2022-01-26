function currenciesAPI() {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());
}

export default currenciesAPI;

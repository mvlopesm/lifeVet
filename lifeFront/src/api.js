import axios from "axios";

const getAnimals = async () => {
  axios
    .get("http://localhost:8000/animals")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Erro na solicitação:", error);
    });
};

export default getAnimals;

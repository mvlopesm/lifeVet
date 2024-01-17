import axios from "axios";

const getAnimals = async () => {
  try {
    const response = await axios.get("http://localhost:8000/animals");
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

export default getAnimals;

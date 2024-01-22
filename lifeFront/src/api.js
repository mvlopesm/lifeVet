import axios from "axios";

// Função para criar uma instância axios com cabeçalhos incluindo o token
const axiosInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:8000/api", // Defina a URL base da API
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAnimals = async () => {
  try {
    const response = await axiosInstance().get("/animals");
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

const getAnimalsById = async (id) => {
  try {
    const response = await axiosInstance().get(`/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

const getExamTypes = async () => {
  try {
    const response = await axiosInstance().get("/exam-types");
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

const getExams = async () => {
  try {
    const response = await axiosInstance().get("/exams");
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

const getExamsResults = async () => {
  try {
    const response = await axiosInstance().get("/exams-results");
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

export {
  getAnimals,
  getAnimalsById,
  getExamTypes,
  getExams,
  getExamsResults,
  axiosInstance,
};

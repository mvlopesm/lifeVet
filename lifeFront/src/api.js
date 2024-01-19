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

const getAnimalsById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/animals/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

const getExamTypes = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/exam-types`);
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

const getExams = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/exams`);
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

const getExamsResults = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/exams-results`);
    return response.data;
  } catch (error) {
    console.error("Erro na solicitação:", error);
    throw error;
  }
};

export { getAnimals, getAnimalsById, getExamTypes, getExams, getExamsResults };

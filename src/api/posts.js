import axios from "axios";

export const fetchPosts =  async() => {
    const response = await axios.get("https://zenquotes.io/api/random");
    return response.data[0]; //retorna os dados da requisição
}

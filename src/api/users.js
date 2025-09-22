import axios from "axios";

const API = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers() {
    try {
        const res = await axios.get(API);
        return res.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
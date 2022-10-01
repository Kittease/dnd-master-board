import axios from 'axios';
import { Monster, MonsterDetails } from '../Types/Encounter';

const API = axios.create({
    baseURL: 'https://api.ca-mercey.fr/dnd/',
    timeout: 5000,
    validateStatus: (status: number) => status >= 200 && status < 500,
});


export const getMonsters = async (): Promise<Monster[]> => {
    const response = await API.get<Monster[]>('monsters');
    if (response.status !== 200)
        throw new Error("Something wen't wrong");
    return response.data;
};

export const getMonster = async (id: number): Promise<MonsterDetails> => {
    const response = await API.get<MonsterDetails>(`monsters/${id}`);
    if (response.status !== 200)
        throw new Error("Something wen't wrong");
    return response.data;
};
  
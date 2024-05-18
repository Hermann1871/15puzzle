import axios from "axios";

import { UserAPIResponse, User, Info } from '../models/results'

const usersListURL = "https://randomuser.me/api"
const results = 10
const seed = 'abc'

export const getUserList = async (page: number): Promise<UserAPIResponse> => {

    const URL = `${usersListURL}/?page=${page}&results=${results}&seed=${seed}`;
    // console.log('URL', URL)
    try {
        // const res = await axios.get<{ results: UserAPIResponse }>(URL);
        // const res = await axios.get<{ results: User[]; info: Info }>(URL);
        const res = await axios.get<UserAPIResponse>(URL);
        return res.data;
    } catch (error) {
        console.log(error);
        return { results: [], info: { seed: '', results: 0, page: 0, version: '' } };
    }
};

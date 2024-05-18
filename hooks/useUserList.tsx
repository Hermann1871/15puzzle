import React, { useCallback, useEffect, useState } from "react";
import { getUserList } from "../services/Users";
import { UserAPIResponse, User, Info } from "../models/results";

const useUserList = () => {

    const [page, setPage] = useState<number>(1);
    const [list, setList] = useState<User[]>();

    useEffect(() => {
        fetchList();
        console.log("Right Page:", page);
    }, [page]);
    // }, [page, fetchList]);

    //perché? per memorizzare la funzione in modo da non reindirizzarla ad ogni render+
    const fetchList = useCallback(async () => {
        const usersList = await getUserList(page);
        // console.log("PROVA", usersList)
        setList(usersList.results);
    }, [page]);

    const setNextPage = () => {
        setPage((page) => page + 1);
        console.log("Page:", page + 1);
    };

    const setPrevPage = () => {
        if (page < 1) return;
        setPage((page) => page - 1);
        console.log("Page:", page - 1);

    };

    return { page, list, setNextPage, setPrevPage };

};

export default useUserList;

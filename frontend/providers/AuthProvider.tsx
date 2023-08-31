import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";
import { axios } from "../utils/axios";
import { BEARER } from "../utils/constants";
import { getToken } from "../utils/localStorageHelper";
import { responseParser } from "../utils/responseParse";

type Props = {
  children?: React.ReactNode;
};
const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const authToken = getToken();

  const fetchLoggedInUser = async (token: string) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const { id } = data;
      const { data: user } = await axios.get(
        `/users/${id}?populate[profileDetail][fields][0]=firstName&populate[profileDetail][fields][1]=lastName&populate[profileDetail][populate][profileImage][fields][0]=url&populate[company][fields][0]=name&populate[company][populate][profileImg][fields][0]=url&fields[0]=url&fields[1]=username&fields[2]=email`
      );
      if (user.company) {
        setIsCompany(true);
      } else {
        setIsCompany(false);
      }
      setUserData(user);
    } catch (error) {
      console.error(error);
    } finally {
      console.log('start');
      
        setIsLoading(false);
    }
  };

  const handleUser = (user: User) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
    else {
      setIsLoading(false);
    }
  }, [authToken]);
  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading, isCompany }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

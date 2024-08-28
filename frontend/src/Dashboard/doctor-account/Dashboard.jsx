import React from 'react';
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from '../../config';

const Dashboard = () => {

    const {data, loading, error} = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  return <section>
    <div className='max-w-[1170px] px-5 mx-auto'></div>
  </section>
};

export default Dashboard;
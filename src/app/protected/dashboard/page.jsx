'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/utils/auth';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserInjured,
  faUserDoctor,
  faCalendarCheck,
  faFolderOpen,
  faCalendarDay,
  faHeartPulse,
} from '@fortawesome/free-solid-svg-icons';

const fetcher = (url) => fetch(url).then((res) => res.json());

const StatCard = ({ icon, label, value, color }) => (
  <div className='bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm border border-base-300 hover:shadow-md transition-shadow'>
    <div className={`text-4xl p-3 rounded-xl bg-base-200 ${color}`}>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <p className='text-sm text-base-content/60 uppercase tracking-wider font-medium'>{label}</p>
      <p className='text-4xl font-bold text-base-content'>{value ?? '—'}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const router = useRouter();
  const { data: stats, isLoading } = useSWR('/api/stats', fetcher);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (isTokenExpired(token) === null) {
      router.push('/login');
    }
  }, [router]);

  return (
    <section className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight text-base-content'>Dashboard</h1>
        <p className='text-base-content/60 mt-1'>Resumen general del sistema</p>
      </div>

      {isLoading ? (
        <div className='flex justify-center items-center h-40'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          <StatCard
            icon={faUserInjured}
            label='Total Pacientes'
            value={stats?.totalPacientes}
            color='text-primary'
          />
          <StatCard
            icon={faHeartPulse}
            label='Pacientes Activos'
            value={stats?.pacientesActivos}
            color='text-success'
          />
          <StatCard
            icon={faUserDoctor}
            label='Especialistas'
            value={stats?.totalEspecialistas}
            color='text-secondary'
          />
          <StatCard
            icon={faCalendarCheck}
            label='Total Citas'
            value={stats?.totalCitas}
            color='text-accent'
          />
          <StatCard
            icon={faCalendarDay}
            label='Citas Hoy'
            value={stats?.citasHoy}
            color='text-warning'
          />
          <StatCard
            icon={faFolderOpen}
            label='Diagnosticos'
            value={stats?.totalDiagnosticos}
            color='text-info'
          />
        </div>
      )}
    </section>
  );
};

export default Dashboard;

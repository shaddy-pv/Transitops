import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

// --- Dashboard ---
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const { data } = await api.get('/dashboard');
      return data.data || {}; // stats, chartData, recentActivity, etc.
    },
  });
};

// --- Vehicles ---
export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicles');
      return data.data || []; // array of vehicles
    },
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vehicleData: FormData) => {
      const { data } = await api.post('/vehicles', vehicleData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};

// --- Drivers ---
export const useDrivers = () => {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: async () => {
      const { data } = await api.get('/drivers');
      return data.data || [];
    },
  });
};

export const useCreateDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (driverData: FormData) => {
      const { data } = await api.post('/drivers', driverData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
};

// --- Trips ---
export const useTrips = () => {
  return useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data } = await api.get('/trips');
      return data.data || [];
    },
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tripData: any) => {
      const { data } = await api.post('/trips', tripData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
};

// --- Maintenance ---
export const useMaintenance = () => {
  return useQuery({
    queryKey: ['maintenance'],
    queryFn: async () => {
      const { data } = await api.get('/maintenance');
      return data.data || [];
    },
  });
};

export const useLogMaintenance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post('/maintenance', payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
};

// --- Fuel ---
export const useFuel = () => {
  return useQuery({
    queryKey: ['fuel'],
    queryFn: async () => {
      const { data } = await api.get('/fuel');
      return data.data || [];
    },
  });
};

export const useLogFuel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post('/fuel', payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fuel'] });
    },
  });
};

import { RequestAPIData } from '../../interface/Bookings';
import { FetchOptions } from '../../interface/FetchOptions';

export const getRequests = async (): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/requests`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getBookings = async (): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/requests/bookings`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const postRequest = async (
  createdBy: string,
  receivedBy: string,
  start: Date,
  end: Date,
): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      createdBy,
      receivedBy,
      start,
      end,
    }),
  };
  return await fetch(`/requests`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const acceptRequest = async (request: string): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      request,
      accepted: true,
      declined: false,
    }),
  };
  return await fetch(`/requests/${request}/accept`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const declineRequest = async (request: string): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      request,
      accepted: false,
      declined: true,
    }),
  };
  return await fetch(`/requests/${request}/accept`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

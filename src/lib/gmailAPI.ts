import { getAccessToken } from "./firebaseAuth";

/**
 * Utility to interact with the Gmail API using the access token from Firebase Auth.
 */

export const getProfile = async () => {
  const token = await getAccessToken();
  if (!token) throw new Error("No access token available");

  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/profile",
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
};

export const listMessages = async (maxResults = 10) => {
  const token = await getAccessToken();
  if (!token) throw new Error("No access token available");

  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) throw new Error("Failed to list messages");
  return response.json();
};

export const getMessage = async (messageId: string) => {
  const token = await getAccessToken();
  if (!token) throw new Error("No access token available");

  const response = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!response.ok) throw new Error("Failed to get message");
  return response.json();
};

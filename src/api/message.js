import useAxios from ".";
import { toFormData } from "../util/helpers";

export const get_messages = (spaceID) => {
  return useAxios.get(`/spaces/${spaceID}/chat/get-messages`);
};

export const get_mentionable_users = (spaceID) => {
  return useAxios.get(`/spaces/${spaceID}/chat/get-users-to-mention`);
};
export const send_message = (spaceID, data) => {
  const formData = toFormData(data);
  return useAxios.post(`/spaces/${spaceID}/chat/send-messages`, formData);
};

/**
 * Add reaction to a message
 *
 * @param {String} spaceID Target Space ID
 * @param {String} messageID Target Message ID
 * @param {String} emoji Reaction Emoji
 * @returns Promise
 */
export const add_reaction = (spaceID, messageID, emoji) => {
  return useAxios.put(`/spaces/${spaceID}/chat/${messageID}`, {
    reaction: emoji,
  });
};

/**
 * delete message
 *
 * @param {String} spaceID Target Space ID
 * @param {String} messageID Target Message ID
 * @returns Promise
 */
export const delete_message = (spaceID, messageID) => {
  return useAxios.delete(`/spaces/${spaceID}/chat/${messageID}`);
};

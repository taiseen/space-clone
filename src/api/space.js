import useAxios from ".";

export const get_space_members = (spaceId) => {
  return useAxios.get(`/spaces/${spaceId}/members`);
};

export const add_space_members = (spaceId, memberId) => {
  return useAxios.put(`/spaces/${spaceId}/add-members`, {
    memberId,
  });
};

export const remove_space_members = (spaceId, memberId) => {
  return useAxios.put(`/spaces/${spaceId}/remove-members`, {
    memberId,
  });
};

export const update_space = (spaceId, data) => {
  return useAxios.patch(`/spaces/${spaceId}`, {
    name: data.name,
    description: data.description,
    color: data.color,
    privacy: data.privacy,
  });
};

export const leave_space = (spaceId) => {
  return useAxios.post(`/spaces/${spaceId}/leave`);
};

export const delete_space = (spaceId) => {
  return useAxios.delete(`/spaces/${spaceId}`);
};
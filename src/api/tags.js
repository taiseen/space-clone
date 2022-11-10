import useAxios from ".";

export const get_tags = (workSpaceId) => {
  return useAxios.get(`workspaces/${workSpaceId}/tags`);
};

export const create_tag = ({ workSpaceId, name, color }) => {
  return useAxios.post(`workspaces/${workSpaceId}/tags`, {
    name,
    color,
  });
};

export const edit_tag = ({ workSpaceId, tagId, name, color }) => {
  return useAxios.patch(`workspaces/${workSpaceId}/tags/${tagId}`, {
    name,
    color,
  });
};

export const delete_tag = ({ workSpaceId, tagId }) => {
  return useAxios.delete(`workspaces/${workSpaceId}/tags/${tagId}`);
};

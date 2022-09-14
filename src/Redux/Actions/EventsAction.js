import { ActionTypes } from '../Constants/ActionTypes';

export const AddEvent = (data) => {
  return {
    type: ActionTypes.ADD_EVENT,
    payload: { data },
  };
};

export const EditEvent = (data) => {
  return {
    type: ActionTypes.EDIT_EVENT,
    payload: { data },
  };
};

export const DeleteEvent = (id) => {
  return {
    type: ActionTypes.DELETE_EVENT,
    payload: { id },
  };
};

import { UsersPermissionsRole } from "../../graphql/queryTypes";

const initial: UsersPermissionsRole | {} = {};

export default function viewReducer(state = initial, action: any) {
  switch (action.type) {
    case false:
      return state;
    default:
      return state;
  }
}

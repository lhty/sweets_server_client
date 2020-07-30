const initial: {
  consructorWindow: "half" | "full" | "closed";
} = {
  consructorWindow: "closed",
};

export default function viewReducer(state = initial, action) {
  switch (action.type) {
    case false:
      return state;

    default:
      return state;
  }
}

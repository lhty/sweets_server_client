import React, { ReactElement } from "react";
import * as styles from "./ProfilePage.css";
import { UsersPermissionsMe } from "../../../@types/queryTypes";

interface Props {
  user: UsersPermissionsMe | boolean;
  handleLogout: () => void;
}

export default function ProfilePage({
  user,
  handleLogout,
}: Props): ReactElement | null {
  if (typeof user === "boolean") return null;
  return (
    <div className={styles.profile}>
      <div className={styles.profile_head}>
        <h2>{user.username}</h2>
        <button className={styles.profile_logout} onClick={handleLogout}>
          Выйти
        </button>
      </div>
      {user.role.id > "1" && (
        <button
          className={styles.profile_logout}
          onClick={() => console.log(123)}
        >
          админка
        </button>
      )}
    </div>
  );
}

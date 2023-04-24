import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";
import { useState } from "react";
import { userPublicProfile } from "../../actions/user";

const Admin = ({ children }) => {
  const router = useRouter();
  const [senderUser, setSenderUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      const data = await userPublicProfile(result.username);
      const user = data.user;
      setSenderUser(user);
      if (!result) {
        router.push("/signin");
      } else if (user.role !== 1) {
        router.push("/");
      }
    };
    fetchUser();
  }, []);

  return <>{children}</>;
};

export default Admin;

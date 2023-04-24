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
      if (result) {
        userPublicProfile(result.username).then((data) => {
          const user = data.user;
          setSenderUser(user);
          if (user.role !== 1) {
            router.push("/");
          }
        });
      } else {
        router.push("/signin");
      }
    };
    fetchUser();
  }, []);

  return <>{children}</>;
};

export default Admin;

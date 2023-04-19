import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";
import { useState } from "react";

const Admin = ({ children }) => {
  const router = useRouter();
  const [senderUser, setSenderUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      setSenderUser(result);
      if (!result) {
        router.push("/signin");
      } else if (result.role !== 1) {
        router.push("/");
      }
    };
    fetchUser();
  }, []);

  return <>{children}</>;
};

export default Admin;

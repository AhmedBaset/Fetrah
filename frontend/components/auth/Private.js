import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuth } from "../../actions/auth";

const Private = ({ children }) => {
  const router = useRouter();

  const [senderUser, setSenderUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await isAuth();
      setSenderUser(result);
      if (!result) {
        router.push("/signin");
      }
    };
    fetchUser();
  }, []);

  return <>{children}</>;
};

export default Private;

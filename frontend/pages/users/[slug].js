import { useRouter } from "next/router";
import { userPublicProfile } from "../../actions/user";
import Layout from "../../components/Layout";
import UserInfo from "../../components/user/UserInfo";

const UserDetails = ({ user }) => {
  const router = useRouter();

  if (!user && typeof window !== "undefined") {
    router.replace("/users");
  }
  return (
    <>
      <Layout>{user && <UserInfo user={user} />}</Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { params, req } = context;
  const { slug } = params;

  let user = null;
  if (slug) {
    await userPublicProfile(slug).then((data) => {
      if (data.error) {
        console.log("Error getting data");
      } else {
        user = data.user;
      }
    });
  }
  return { props: { user } };
}

export default UserDetails;

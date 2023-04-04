import { userPublicProfile } from "../../actions/user";
import Layout from "../../components/Layout";
import UserInfo from "../../components/user/UserInfo";

const UserDetails = ({ user }) => {
  return (
    <>
      <Layout>
        <UserInfo user={user} />
      </Layout>
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

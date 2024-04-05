import { getAuth } from "../../../../actions/getAuth";
import { auth, signOut } from "../../../../auth";

const SettingsPage = async () => {
  const session = await getAuth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="btn">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;

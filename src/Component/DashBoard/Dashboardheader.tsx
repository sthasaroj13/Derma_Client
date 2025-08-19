import useAppSelector from "../../Hooks/useAppSelector";

const DashboardHeader: React.FC = () => {
  const { name } = useAppSelector((state) => state.auth);
  return (
    <div className="bg-white rounded-xl shadow p-6 text-orange-700">
      <h2 className="text-2xl font-bold">
        Welcome back,{" "}
        <span className=" text-2xl font-bold capitalize"> {name} 👋</span>{" "}
      </h2>
      <p className="text-gray-600 mt-1">
        Here's your skin health overview and history.
      </p>
    </div>
  );
};

export default DashboardHeader;

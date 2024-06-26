import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      className=" py-1 px-2 border-solid bg-purple-900 border-2 font-semibold hover:bg-purple-500 text-white text-xs"
      onClick={handleBack}
    >
      Back
    </button>
  );
}

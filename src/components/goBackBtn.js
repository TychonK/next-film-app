import { useRouter } from "next/router";

export default function GoBackBtn() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900"
    >
      go back
    </button>
  );
}

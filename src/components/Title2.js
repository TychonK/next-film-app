export default function Title2({ text, subText }) {
  return (
    <h2 className="text-6xl ml-28 font-semibold break-normal break-all relative pseudo-title">
      {text}
      {subText &&
        <span class="bg-blue-100 uppercase text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-4 align-middle">
          {subText}
        </span>
      }
    </h2>
  );
}

export default function Title2({ text, subText, className }) {
  return (
    <h2
      className={
        "text-center md:text-left text-3xl ml-4 md:text-6xl md:ml-28 font-semibold relative pseudo-title" +
        " " +
        className
      }
    >
      {text}
      {subText && (
        <span className="inline-block uppercase text-base md:text-2xl font-semibold px-1 md:px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-2 align-middle break-normal">
          {subText}
        </span>
      )}
    </h2>
  );
}

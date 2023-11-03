export default function Placeholder({number}) {
    return Array.from({ length: number }, (_, index) => (
      <div
        key={index}
        className="flex flex-col m-8 rounded shadow-md sm:w-80 animate-pulse h-96"
        style={{ minWidth: "260px", maxWidth: "260px" }}
      >
        <div className="h-48 rounded-t bg-gray-700"></div>
        <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-900">
          <div className="w-full h-6 rounded bg-gray-700"></div>
          <div className="w-full h-6 rounded bg-gray-700"></div>
          <div className="w-3/4 h-6 rounded bg-gray-700"></div>
        </div>
      </div>
    ));
}
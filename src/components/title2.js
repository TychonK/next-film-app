export default function Title2({ text }) {
    return (
      <h2 className="font-extralight pointer-events-none mt-12 mb-4 text-8xl lg:text-xxl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        {text}
      </h2>
    );
}
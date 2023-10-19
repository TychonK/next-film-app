export default function Title2({ text }) {
    return (
      <h2 className="absolute -top-20 -left-6 lg:-top-36 lg:-left-14 pointer-events-none font-extralight text-8xl lg:text-xxl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        {text}
      </h2>
    );
}
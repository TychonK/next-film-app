import { useEffect, useState } from "react";

export default function ScrollContainer({ children, scrollTime, containerId }) {
    const [isScrollPaused, setScrollPaused] = useState(false);

    const autoScroll = () => {
        const container = document.getElementById(containerId);
      
        if (container && !isScrollPaused) {
          if (
              container.scrollLeft <
              container.scrollWidth - container.offsetWidth
          ) {
              container.scrollLeft += 500;
          } else {
              container.scrollLeft = 0;
          }
      }
    };
    
    useEffect(() => {
      const scrollInterval = setInterval(autoScroll, scrollTime);
      return () => clearInterval(scrollInterval);
    }, [isScrollPaused]);

    const handleMouseEnter = () => {
        setScrollPaused(true);
    };

    const handleMouseLeave = () => {
        setScrollPaused(false);
    };
    
    return (
      <ul
        id={containerId}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative scroll-container pb-1 flex overflow-x-scroll rounded-md"
      >
        {children}
      </ul>
    );
}
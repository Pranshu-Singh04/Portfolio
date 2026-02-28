import { useEffect, useRef } from 'react';

export default function Cursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const outerPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const hovering = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (innerRef.current) {
        innerRef.current.style.left = e.clientX + 'px';
        innerRef.current.style.top = e.clientY + 'px';
      }

      // Check what element is under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el && (
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[data-hover]') ||
        el.tagName === 'A' ||
        el.tagName === 'BUTTON'
      );

      if (isInteractive && !hovering.current) {
        hovering.current = true;
        outerRef.current?.classList.add('hovering');
        innerRef.current?.classList.add('hovering');
      } else if (!isInteractive && hovering.current) {
        hovering.current = false;
        outerRef.current?.classList.remove('hovering');
        innerRef.current?.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMove);

    const animate = () => {
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.1;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.1;
      if (outerRef.current) {
        outerRef.current.style.left = outerPos.current.x + 'px';
        outerRef.current.style.top = outerPos.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
}

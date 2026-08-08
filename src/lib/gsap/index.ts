import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Import and register specific plugins only when needed.
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins that are commonly used across the docs.
// Other plugins like Physics2DPlugin, GSDevTools should NOT be registered here.
if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export { gsap, useGSAP, ScrollTrigger, SplitText };

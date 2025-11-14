react hooks revised 

Corrected & Rephrased Notes:

useState → State change hone par component re-render hota hai. Har state update UI ko reflect karne ke liye re-render trigger karta hai.

useEffect → Side effects handle karne ke liye use hota hai (API call, event listener, DOM manipulation). Ye render ke baad run hota hai, aur dependencies ke basis par control kar sakte ho ki kab chale.

React.memo → Functional component ko unnecessary re-renders se bachata hai. Agar props change nahi hote to component dobara render nahi hota. (PureComponent ka functional version).

Prop Drilling → Jab ek parent component ko data deep child component tak bhejna hota hai, to multiple levels of props ke through data pass karna padta hai → isse unnecessary re-renders aur code clutter hota hai.

Redux / Context API → Prop drilling ka solution hai. State ko ek central store me rakha jata hai jaha se components directly required data le lete hain, bina props chain ke.

useMemo → Expensive calculations ko memoize karta hai. Agar dependencies same hain to pehle se calculated value ko reuse karega, unnecessary recalculations se bacha lega.

useCallback → Functions ko memoize karta hai. Ek hi function dobara create na ho jab tak dependencies change na ho. Ye mainly unnecessary re-renders prevent karne ke liye helpful hai, especially jab function props ke through children ko pass ho.

useRef → Ek mutable reference deta hai jo render ke beech persist karta hai. Iske change hone par re-render nahi hota. Mostly DOM elements ko reference karne ya ek value ko store karne ke liye use hota hai jisko UI update ki zarurat nahi.
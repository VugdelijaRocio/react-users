import React, { useEffect } from "react";

export const useClickOutside = (ref: any, callback: (event?: any) => void) => {
    useEffect(() => {

        const handleClickOutside = (event: any) => {
            event.stopPropagation();
            console.log("CLICK OUTSIDE");
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            }
        };
        if(ref.current) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      },

      [ref, callback]
    );
}


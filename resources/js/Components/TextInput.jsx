import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-lodex-cyan focus:ring-lodex-cyan dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:focus:border-lodex-cyan dark:focus:ring-lodex-cyan ' +
                className
            }
            ref={localRef}
        />
    );
});

import { ImgHTMLAttributes, ReactNode, SyntheticEvent, useState } from 'react';
import classes from './optimizer.module.scss';

export const Image = ({ onLoad, onDOMContentLoaded, style, className, fallback, ...props }: ImgHTMLAttributes<HTMLImageElement> & { onDOMContentLoaded?: (loaded?: boolean) => void, fallback?: ReactNode }) => {
    const [loaded, setLoaded] = useState(false);
    const handleOnload = (e: SyntheticEvent<HTMLImageElement>) => {
        onLoad?.(e);
        onDOMContentLoaded?.(true);
        setLoaded(true);
    }
    return (
        <>
            <img
                onLoad={handleOnload}
                {...props}
                className={`${classes.imageOptimizer}  ${loaded ? '' : (className ?? '')}`}
                style={ loaded ? style : { width: 0, height: 0, padding: 0, margin: 0, opacity: 0 }}
            />
            {
                fallback != null && !loaded ? fallback : null
            }
        </>
    )
}
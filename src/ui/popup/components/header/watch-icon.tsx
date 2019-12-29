import {m} from 'malevic';

export default function WatchIcon({hours, minutes}) {
    const cx = 8;
    const cy = 8;
    const lh = 5;
    const lm = 7;
    const ah = ((hours > 11 ? hours - 12 : hours) + minutes / 60) / 12 * Math.PI * 2;
    const am = minutes / 60 * Math.PI * 2;
    const hx = cx + lh * Math.sin(ah);
    const hy = cy - lh * Math.cos(ah);
    const mx = cx + lm * Math.sin(am);
    const my = cy - lm * Math.cos(am);

    return (
        <svg viewBox="0 0 16 16">
            <line stroke="white" stroke-width="2" x1={cx} y1={cy} x2={hx} y2={hy} />
            <line stroke="white" stroke-width="1.5" x1={cx} y1={cy} x2={mx} y2={my} />
        </svg>
    );
}

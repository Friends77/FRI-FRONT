import SVG, { ISVG } from '..';

const ArrowLeft = ({ width, height, color, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 6 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M1.10603 6.00006L5.35203 10.2463C5.4457 10.3398 5.4957 10.4546 5.50203 10.5906C5.50853 10.7264 5.45853 10.8475 5.35203 10.9538C5.2457 11.0603 5.12778 11.1136 4.99828 11.1136C4.86878 11.1136 4.75086 11.0603 4.64453 10.9538L0.256031 6.56556C0.168864 6.47823 0.107614 6.38906 0.0722809 6.29806C0.0371142 6.20706 0.0195312 6.10773 0.0195312 6.00006C0.0195312 5.8924 0.0371142 5.79306 0.0722809 5.70206C0.107614 5.61106 0.168864 5.5219 0.256031 5.43456L4.64453 1.04631C4.73803 0.952646 4.85278 0.902646 4.98878 0.896313C5.12461 0.889813 5.2457 0.939813 5.35203 1.04631C5.45853 1.15265 5.51178 1.27056 5.51178 1.40006C5.51178 1.52956 5.45853 1.64748 5.35203 1.75381L1.10603 6.00006Z"
        fill={color}
      />
    </SVG>
  );
};

export default ArrowLeft;

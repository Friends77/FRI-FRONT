import SVG, { ISVG } from '..';

const AlarmTriangle = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M10.7814 1.88722C11.5568 0.584512 13.4432 0.584515 14.2186 1.88722L25 20H0L10.7814 1.88722Z"
        fill="white"
      />
    </SVG>
  );
};

export default AlarmTriangle;

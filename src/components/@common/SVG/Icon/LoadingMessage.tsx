import SVG, { ISVG } from '..';

const LoadingMessage = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M7.9987 1.3335V4.00016M7.9987 12.0002V14.6668M3.9987 8.00016H1.33203M14.6654 8.00016H11.9987M12.7176 12.7191L10.832 10.8335M12.7176 3.33346L10.832 5.21908M3.27975 12.7191L5.16536 10.8335M3.27975 3.33346L5.16536 5.21908"
        stroke="#999999"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVG>
  );
};

export default LoadingMessage;

import SVG, { ISVG } from '..';

const Close = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <mask
        id="mask0_2113_1143"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2113_1143)">
        <path
          d="M12.0002 12.708L6.75397 17.954C6.66047 18.0476 6.54572 18.0976 6.40972 18.104C6.27389 18.1105 6.1528 18.0605 6.04647 17.954C5.93997 17.8476 5.88672 17.7297 5.88672 17.6002C5.88672 17.4707 5.93997 17.3528 6.04647 17.2465L11.2925 12.0002L6.04647 6.75397C5.9528 6.66047 5.9028 6.54572 5.89647 6.40972C5.88997 6.27389 5.93997 6.1528 6.04647 6.04647C6.1528 5.93997 6.27072 5.88672 6.40022 5.88672C6.52972 5.88672 6.64764 5.93997 6.75397 6.04647L12.0002 11.2925L17.2465 6.04647C17.34 5.9528 17.4547 5.9028 17.5907 5.89647C17.7266 5.88997 17.8476 5.93997 17.954 6.04647C18.0605 6.1528 18.1137 6.27072 18.1137 6.40022C18.1137 6.52972 18.0605 6.64764 17.954 6.75397L12.708 12.0002L17.954 17.2465C18.0476 17.34 18.0976 17.4547 18.104 17.5907C18.1105 17.7266 18.0605 17.8476 17.954 17.954C17.8476 18.0605 17.7297 18.1137 17.6002 18.1137C17.4707 18.1137 17.3528 18.0605 17.2465 17.954L12.0002 12.708Z"
          fill="#1A1A1A"
        />
      </g>
    </SVG>
  );
};

export default Close;

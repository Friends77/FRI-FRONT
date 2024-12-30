import SVG, { ISVG } from '..';

const NaverLogin = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="24" cy="24" r="24" fill="#00CB49" />
      <path
        d="M13 14V33.9111H20.6607V23.9494L27.327 33.9111H35V14H27.327V23.9494L20.6607 14H13Z"
        fill="white"
      />
    </SVG>
  );
};

export default NaverLogin;

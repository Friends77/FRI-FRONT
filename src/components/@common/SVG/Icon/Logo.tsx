import SVG, { ISVG } from '..';

const Logo = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0174 4H19.3455V7.33773H16.0174H16.0078H12.6797V4H16.0078H16.0174ZM39.3799 4.0002H36.0422V7.33793H39.375V10.6227H42.7127V7.28496H39.3799V4.0002ZM42.7127 10.623H39.375V13.9608H42.7127V10.623ZM39.375 13.9609H42.7127V17.2979V17.2987V20.6355V20.6356V23.9733H39.3799V23.9736H42.7127V27.3114H39.3799V27.3115H42.7127V30.6493H39.3799V31.4464V33.9864H36.0422V31.4464V30.6486V20.6358V18.0955V17.298H39.375V17.2979V13.9609ZM9.33773 23.9736V23.9733H12.6705V20.6358V20.6355V17.2989V17.298V13.9611H9.33773V13.9608H12.6705V10.623H9.33773H9.33281H6V30.6486V30.6494V33.9864H9.33281H9.33773H12.6705V30.6495V30.6486V27.3117H9.33773V27.3114H12.6705V23.9736H9.33773ZM32.7049 17.298H36.0377V20.6358H32.7V20.6356H29.3672V17.2979H32.7049V17.298ZM26.0252 17.298H29.358V20.6358H26.0252H26.0203H22.6875V17.298H26.0203H26.0252ZM32.7049 30.6486H36.0377V33.9864H32.7V33.9862H29.3672V30.6484H32.7049V30.6486ZM26.0205 30.6486H29.358V33.9864H26.0205H26.0203H22.6828V30.6486H26.0203H26.0205ZM19.3547 33.9873H22.6924V37.325H19.3547V33.9873ZM12.6705 33.9873H9.33773H9.33281H6V37.3235V37.325V40.6612H9.33281V40.6619H12.6705V37.325V37.3242V33.9873ZM6 40.6623H9.33281H9.33773H12.6705V44H9.33773H9.33281H6V40.6623ZM19.3409 37.3242H16.0031V40.6619H19.3409V37.3242ZM16.0174 40.6621H12.6797V43.9998H16.0174V40.6621ZM22.6875 4.0002H19.3547V7.33793H22.6875H22.6924H26.0203H26.0252H29.358V4.0002H26.0252H26.0203H22.6924H22.6875ZM9.33281 7.28496H12.6705V10.6227H9.33281V7.28496ZM29.3672 4H32.7049V4.0002H36.0377V7.33793H32.7V7.33773H29.3672V4Z"
        fill="#4000F5"
      />
    </SVG>
  );
};

export default Logo;

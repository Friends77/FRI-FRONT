import SVG, { ISVG } from '..';

const Camera = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <mask
        id="mask0_2319_2373"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2319_2373)">
        <path
          d="M9.9987 13.8586C10.8277 13.8586 11.5115 13.5825 12.0499 13.0301C12.5884 12.4777 12.8577 11.8009 12.8577 10.9997C12.8577 10.2123 12.5884 9.53898 12.0499 8.97967C11.5115 8.42037 10.8277 8.14072 9.9987 8.14072C9.16967 8.14072 8.48592 8.42037 7.94745 8.97967C7.40898 9.53898 7.13974 10.2123 7.13974 10.9997C7.13974 11.8009 7.40898 12.4777 7.94745 13.0301C8.48592 13.5825 9.16967 13.8586 9.9987 13.8586ZM9.9987 13.192C9.3512 13.192 8.82398 12.9884 8.41703 12.5813C8.00995 12.1744 7.80641 11.6541 7.80641 11.0205C7.80641 10.4008 8.00995 9.87704 8.41703 9.44926C8.82398 9.02134 9.3512 8.80738 9.9987 8.80738C10.6462 8.80738 11.1734 9.02134 11.5804 9.44926C11.9874 9.87704 12.191 10.4008 12.191 11.0205C12.191 11.6541 11.9874 12.1744 11.5804 12.5813C11.1734 12.9884 10.6462 13.192 9.9987 13.192ZM4.01161 16.1663C3.68356 16.1663 3.40495 16.0518 3.17578 15.8226C2.94661 15.5934 2.83203 15.3148 2.83203 14.9868V7.01259C2.83203 6.68454 2.94661 6.40592 3.17578 6.17676C3.40495 5.94759 3.68356 5.83301 4.01161 5.83301H6.3512L7.48911 4.32509C7.60981 4.16259 7.75293 4.03995 7.91849 3.95717C8.08418 3.8744 8.2637 3.83301 8.45703 3.83301H11.5404C11.7337 3.83301 11.9132 3.8744 12.0789 3.95717C12.2445 4.03995 12.3876 4.16259 12.5083 4.32509L13.6462 5.83301H15.9858C16.3277 5.83301 16.6098 5.94759 16.832 6.17676C17.0543 6.40592 17.1654 6.68454 17.1654 7.01259V14.9868C17.1654 15.3148 17.0543 15.5934 16.832 15.8226C16.6098 16.0518 16.3277 16.1663 15.9858 16.1663H4.01161Z"
          fill="#1A1A1A"
        />
      </g>
    </SVG>
  );
};

export default Camera;

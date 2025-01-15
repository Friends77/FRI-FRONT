import SVG, { ISVG } from '..';

const SearchFill = ({ width, height, ...rest }: ISVG) => {
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
        id="mask0_2100_1229"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2100_1229)">
        <path
          d="M9.53934 15.2305C7.94068 15.2305 6.58584 14.6751 5.47484 13.5643C4.36401 12.4533 3.80859 11.0985 3.80859 9.49979C3.80859 7.90113 4.36401 6.54629 5.47484 5.43529C6.58584 4.32446 7.94068 3.76904 9.53934 3.76904C11.138 3.76904 12.4928 4.32446 13.6038 5.43529C14.7147 6.54629 15.2701 7.90113 15.2701 9.49979C15.2701 10.1946 15.147 10.867 14.9008 11.517C14.6547 12.167 14.3316 12.7228 13.9316 13.1843L19.8393 19.092C19.9328 19.1857 19.9828 19.3005 19.9893 19.4363C19.9957 19.5723 19.9457 19.6935 19.8393 19.7998C19.7328 19.9061 19.6148 19.9593 19.4853 19.9593C19.356 19.9593 19.2381 19.9061 19.1316 19.7998L13.2238 13.892C12.7238 14.3177 12.1488 14.6472 11.4988 14.8805C10.8488 15.1139 10.1957 15.2305 9.53934 15.2305ZM9.53934 14.2305C10.8662 14.2305 11.9863 13.7738 12.8998 12.8603C13.8133 11.947 14.2701 10.8268 14.2701 9.49979C14.2701 8.17279 13.8133 7.05263 12.8998 6.13929C11.9863 5.22579 10.8662 4.76904 9.53934 4.76904C8.21234 4.76904 7.09218 5.22579 6.17884 6.13929C5.26534 7.05263 4.80859 8.17279 4.80859 9.49979C4.80859 10.8268 5.26534 11.947 6.17884 12.8603C7.09218 13.7738 8.21234 14.2305 9.53934 14.2305Z"
          fill="white"
        />
      </g>
    </SVG>
  );
};

export default SearchFill;

import SVG, { ISVG } from '..';

const AddFriend = ({ width, height, ...rest }: ISVG) => {
  return (
    <SVG
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <mask
        id="mask0_2002_2429"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2002_2429)">
        <path
          d="M18.75 10.4998H16.25C16.1083 10.4998 15.9896 10.4518 15.8938 10.3558C15.7979 10.2598 15.75 10.1409 15.75 9.99903C15.75 9.85719 15.7979 9.73853 15.8938 9.64303C15.9896 9.54753 16.1083 9.49978 16.25 9.49978H18.75V6.99978C18.75 6.85811 18.798 6.73936 18.894 6.64353C18.99 6.54769 19.1089 6.49978 19.2508 6.49978C19.3926 6.49978 19.5112 6.54769 19.6068 6.64353C19.7023 6.73936 19.75 6.85811 19.75 6.99978V9.49978H22.25C22.3917 9.49978 22.5104 9.54778 22.6063 9.64378C22.7021 9.73978 22.75 9.85869 22.75 10.0005C22.75 10.1424 22.7021 10.261 22.6063 10.3565C22.5104 10.452 22.3917 10.4998 22.25 10.4998H19.75V12.9998C19.75 13.1414 19.702 13.2602 19.606 13.356C19.51 13.4519 19.3911 13.4998 19.2493 13.4998C19.1074 13.4998 18.9888 13.4519 18.8932 13.356C18.7977 13.2602 18.75 13.1414 18.75 12.9998V10.4998ZM9.5 11.3843C8.675 11.3843 7.96875 11.0905 7.38125 10.503C6.79375 9.91553 6.5 9.20928 6.5 8.38428C6.5 7.55928 6.79375 6.85303 7.38125 6.26553C7.96875 5.67803 8.675 5.38428 9.5 5.38428C10.325 5.38428 11.0313 5.67803 11.6188 6.26553C12.2063 6.85303 12.5 7.55928 12.5 8.38428C12.5 9.20928 12.2063 9.91553 11.6188 10.503C11.0313 11.0905 10.325 11.3843 9.5 11.3843ZM2.5 17.5768V16.969C2.5 16.5562 2.62017 16.1699 2.8605 15.8103C3.101 15.4508 3.42442 15.1716 3.83075 14.9728C4.77442 14.5203 5.71867 14.1809 6.6635 13.9545C7.60833 13.7284 8.55383 13.6153 9.5 13.6153C10.4462 13.6153 11.3917 13.7284 12.3365 13.9545C13.2813 14.1809 14.2256 14.5203 15.1693 14.9728C15.5756 15.1716 15.899 15.4508 16.1395 15.8103C16.3798 16.1699 16.5 16.5562 16.5 16.969V17.5768C16.5 17.8703 16.4003 18.1167 16.201 18.316C16.0017 18.5155 15.7552 18.6153 15.4615 18.6153H3.5385C3.24483 18.6153 2.99833 18.5155 2.799 18.316C2.59967 18.1167 2.5 17.8703 2.5 17.5768Z"
          fill="white"
        />
      </g>
    </SVG>
  );
};

export default AddFriend;

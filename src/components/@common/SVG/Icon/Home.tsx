import { ISVG } from '..';

const Home = ({ width, height, ...rest }: ISVG) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <mask
        id="mask0_1303_2083"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1303_2083)">
        <path
          d="M6 17.9997H9.69225V12.9227C9.69225 12.6939 9.76967 12.5021 9.9245 12.3472C10.0793 12.1926 10.2712 12.1152 10.5 12.1152H13.5C13.7288 12.1152 13.9207 12.1926 14.0755 12.3472C14.2303 12.5021 14.3077 12.6939 14.3077 12.9227V17.9997H18V9.30748C18 9.20482 17.9776 9.11182 17.9327 9.02849C17.8879 8.94515 17.827 8.87148 17.75 8.80748L12.3655 4.74973C12.2628 4.66007 12.141 4.61523 12 4.61523C11.859 4.61523 11.7372 4.66007 11.6345 4.74973L6.25 8.80748C6.173 8.87148 6.11208 8.94515 6.06725 9.02849C6.02242 9.11182 6 9.20482 6 9.30748V17.9997ZM5 17.9997V9.30748C5 9.05165 5.05725 8.80932 5.17175 8.58048C5.28608 8.35165 5.44425 8.16323 5.64625 8.01523L11.0308 3.93823C11.3126 3.7229 11.6347 3.61523 11.997 3.61523C12.3593 3.61523 12.6834 3.7229 12.9693 3.93823L18.3538 8.01523C18.5558 8.16323 18.7139 8.35165 18.8282 8.58048C18.9427 8.80932 19 9.05165 19 9.30748V17.9997C19 18.2677 18.9003 18.5014 18.701 18.7007C18.5017 18.9001 18.268 18.9997 18 18.9997H14.1155C13.8865 18.9997 13.6947 18.9223 13.54 18.7675C13.3852 18.6127 13.3077 18.4208 13.3077 18.192V13.1152H10.6923V18.192C10.6923 18.4208 10.6148 18.6127 10.46 18.7675C10.3053 18.9223 10.1135 18.9997 9.8845 18.9997H6C5.732 18.9997 5.49833 18.9001 5.299 18.7007C5.09967 18.5014 5 18.2677 5 17.9997Z"
          fill="#1A1A1A"
        />
      </g>
    </svg>
  );
};

export default Home;

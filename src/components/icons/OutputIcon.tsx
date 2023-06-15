interface OutputIconProps {
  className?: string;
}
const OutputIcon: React.FC<OutputIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.5 11L13 7.5l1.4-1.4l2.1 2.1L20.7 4l1.4 1.4l-5.6 5.6M11 7H2v2h9V7m10 6.4L19.6 12L17 14.6L14.4 12L13 13.4l2.6 2.6l-2.6 2.6l1.4 1.4l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6l2.6-2.6M11 15H2v2h9v-2Z"
      />
    </svg>
  );
};
export default OutputIcon;

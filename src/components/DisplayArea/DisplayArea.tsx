interface DisplayAreaProps {
  children: React.ReactNode;
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ children }) => {
  return <div className="h-full flex-1 overflow-y-scroll">{children}</div>;
};
export default DisplayArea;

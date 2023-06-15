interface DisplayAreaProps {
  children: React.ReactNode;
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};
export default DisplayArea;
